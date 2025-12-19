"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface VideoModalProps {
    url: string
    onClose: () => void
}

/**
 * Extract YouTube video ID from various URL formats
 */
function getYouTubeEmbedUrl(url: string): string {
    try {
        const urlObj = new URL(url)

        // Handle youtube.com/watch?v=VIDEO_ID
        if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
            const videoId = urlObj.searchParams.get('v')
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
        }

        // Handle youtu.be/VIDEO_ID
        if (urlObj.hostname === 'youtu.be') {
            const videoId = urlObj.pathname.slice(1)
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
        }

        // Handle youtube.com/embed/VIDEO_ID (already embedded)
        if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.includes('/embed/')) {
            return `${url}?autoplay=1&rel=0&modestbranding=1`
        }

        // Fallback: return original URL
        return url
    } catch (error) {
        console.error('Invalid YouTube URL:', error)
        return url
    }
}

const VideoModal = ({ url, onClose }: VideoModalProps) => {
    const embedUrl = getYouTubeEmbedUrl(url)

    // Handle ESC key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [onClose])

    // Lock body scroll when modal is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
        >
            {/* Modal Container */}
            <div
                className="relative w-full max-w-5xl bg-zinc-800 rounded-2xl shadow-2xl border border-sky-400/30 overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-800/95 backdrop-blur-sm">
                    <h2 id="video-modal-title" className="text-lg font-semibold text-sky-100">
                        Video
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-zinc-400 transition-all hover:bg-sky-500/20 hover:text-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        aria-label="Close video modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Video Container - 16:9 Aspect Ratio */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        src={embedUrl}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube video player"
                    />
                </div>
            </div>
        </div>
    )
}

export default VideoModal
