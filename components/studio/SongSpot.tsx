"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SONG } from "@/lib/content";

function formatTime(total: number): string {
  if (!Number.isFinite(total) || total < 0) return "0:00";
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * SongSpot — one favorite song, zero autoplay. A single Audio instance
 * (ref) is created only when a licensed `audioUrl` exists; it starts
 * paused, plays solely on user action, and is torn down on unmount.
 * With no licensed file configured, the player shows a graceful fallback
 * with clearly-labeled official external links instead.
 */
export function SongSpot() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(() =>
    SONG.audioUrl.length > 0 ? "loading" : "idle"
  );

  const hasAudio = SONG.audioUrl.length > 0;

  // One audio instance for the component's lifetime; full cleanup.
  useEffect(() => {
    if (!hasAudio) return;
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;
    const onMeta = () => {
      setDuration(audio.duration);
      setStatus("ready");
    };
    const onTime = () => setTime(audio.currentTime);
    const onEnd = () => setPlaying(false);
    const onErr = () => setStatus("error");
    const onPauseHidden = () => {
      if (document.hidden) {
        audio.pause();
        setPlaying(false);
      }
    };
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onErr);
    document.addEventListener("visibilitychange", onPauseHidden);
    audio.src = SONG.audioUrl;
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onErr);
      document.removeEventListener("visibilitychange", onPauseHidden);
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [hasAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = muted;
      audio.volume = volume;
    }
  }, [muted, volume]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || status === "error") return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setStatus("error");
      }
    }
  };

  const seek = (next: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, next));
    setTime(audio.currentTime);
  };

  return (
    <section aria-label="Favorite song" id="song" className="wrap scroll-mt-24 py-16 md:py-24">
      <SectionHeading
        index="07"
        eyebrow="Headphones on"
        title={
          <>
            Bored? Listen to <em className="font-display italic">one favorite song</em>.
          </>
        }
      />
      <Reveal>
        <div className="card mx-auto max-w-2xl p-6 md:p-8">
          <div className="flex items-center gap-4">
            <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-clay font-display text-2xl font-black text-paper">
              ♪
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-xl font-bold leading-tight">{SONG.title}</p>
              <p className="t-small truncate text-inksoft">{SONG.artist}</p>
            </div>
          </div>
          <p className="t-small mt-4 border-l-4 border-ochre pl-4 italic text-inksoft">{SONG.note}</p>

          {hasAudio ? (
            <div className="mt-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggle}
                  disabled={status === "loading"}
                  aria-label={playing ? `Pause ${SONG.title}` : `Play ${SONG.title}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform hover:scale-105 disabled:opacity-50"
                >
                  {playing ? <Pause size={20} aria-hidden /> : <Play size={20} aria-hidden className="ml-0.5" />}
                </button>
                <span className="t-small w-11 shrink-0 tabular-nums text-inksoft">{formatTime(time)}</span>
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, duration)}
                  step={0.5}
                  value={Math.min(time, duration || 0)}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="Seek through song"
                  className="min-w-0 flex-1"
                />
                <span className="t-small w-11 shrink-0 tabular-nums text-inksoft">{formatTime(duration)}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Unmute" : "Mute"}
                  aria-pressed={muted}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-ink"
                >
                  {muted ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    setMuted(false);
                  }}
                  aria-label="Volume"
                  className="w-32 max-w-full"
                />
                <span aria-live="polite" className="t-small text-faint">
                  {status === "loading" ? "Loading…" : status === "error" ? "Couldn't load audio." : playing ? "Playing" : "Paused"}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-line-strong p-5" role="status">
              <p className="t-small font-semibold">No licensed audio file in this repo — by design.</p>
              <p className="t-small mt-1.5 text-inksoft">
                “{SONG.title}” isn&apos;t mine to distribute, so there&apos;s no autoplay here and nothing to
                accidentally blast. Press play on an official source instead:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SONG.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid !min-h-11 !px-5 !py-2 !text-sm"
                  >
                    Listen on {l.label} ↗
                  </a>
                ))}
              </div>
              <p className="stamp mt-4">External official search · opens in a new tab</p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
