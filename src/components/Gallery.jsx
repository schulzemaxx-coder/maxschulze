import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

// ─── Image data ──────────────────────────────────────────────────────────────
// Replace the src values with your own uploaded image paths, e.g. '/images/headshot1.jpg'
// Aspect ratios: headshots → portrait (3:4), BTS → landscape or square
const HEADSHOTS = [
  {
    id: 'h1',
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=70',
    label: 'Official Headshot I',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'h2',
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=70',
    label: 'Official Headshot II',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'h3',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=70',
    label: 'Official Headshot III',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'h4',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70',
    label: 'Official Headshot IV',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'h5',
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=70',
    label: 'Official Headshot V',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'h6',
    src: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=400&q=70',
    label: 'Official Headshot VI',
    photographer: 'Placeholder – replace with your photo',
  },
]

const BTS = [
  {
    id: 'b1',
    src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=70',
    label: 'On Set – Drama Production',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'b2',
    src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=70',
    label: 'On Set – Film Shoot',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'b3',
    src: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=500&q=70',
    label: 'Rehearsal – Theatre',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'b4',
    src: 'https://images.unsplash.com/photo-1612843165628-df790b55e50e?w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1612843165628-df790b55e50e?w=500&q=70',
    label: 'Behind the Camera',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'b5',
    src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&q=70',
    label: 'Green Room',
    photographer: 'Placeholder – replace with your photo',
  },
  {
    id: 'b6',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=70',
    label: 'Premiere Night',
    photographer: 'Placeholder – replace with your photo',
  },
]

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index]
  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#f5f0eb', opacity: 0.7,
          transition: 'opacity 0.2s',
          zIndex: 10000,
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
        aria-label="Close"
      >
        <X size={30} />
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          style={{
            position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50%', width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#f5f0eb', zIndex: 10000,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {index < images.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          style={{
            position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50%', width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#f5f0eb', zIndex: 10000,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 'min(90vw, 900px)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <img
          src={img.src}
          alt={img.label}
          style={{
            maxWidth: '100%',
            maxHeight: '78vh',
            objectFit: 'contain',
            display: 'block',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.1rem',
            color: '#f5f0eb',
            margin: 0,
            letterSpacing: '0.05em',
          }}>{img.label}</p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: '#666',
            margin: '0.3rem 0 0',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>{img.photographer}</p>
        </div>
        {/* Counter */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.7rem',
          color: '#c9a84c',
          letterSpacing: '0.15em',
          margin: 0,
        }}>{index + 1} / {images.length}</p>
      </motion.div>
    </motion.div>
  )
}

// ─── Gallery grid ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const [tab, setTab] = useState('headshots')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const images = tab === 'headshots' ? HEADSHOTS : BTS
  const isOpen = lightboxIndex !== null

  const open = (i) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex(i => Math.max(0, i - 1))
  const next = () => setLightboxIndex(i => Math.min(images.length - 1, i + 1))

  // Keyboard nav
  const handleKey = (e) => {
    if (!isOpen) return
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') close()
  }

  return (
    <section
      id="gallery"
      onKeyDown={handleKey}
      tabIndex={-1}
      style={{
        padding: '7rem 2rem 6rem',
        background: '#0a0a0a',
        outline: 'none',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
      >
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          marginBottom: '0.8rem',
        }}>Visual Portfolio</p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 300,
          color: '#f5f0eb',
          margin: 0,
          letterSpacing: '0.04em',
        }}>Gallery</h2>
        <div style={{
          width: 40, height: 1,
          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
          margin: '1.5rem auto 0',
        }} />
      </motion.div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0',
        marginBottom: '3rem',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        width: 'fit-content',
        margin: '0 auto 3rem',
      }}>
        {['headshots', 'bts'].map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setLightboxIndex(null) }}
            style={{
              padding: '0.65rem 2rem',
              background: tab === t ? '#c9a84c' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: tab === t ? '#0a0a0a' : '#8a8a8a',
              fontWeight: tab === t ? 600 : 400,
              transition: 'all 0.3s',
            }}
          >
            {t === 'headshots' ? 'Headshots' : 'Behind the Scenes'}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: tab === 'headshots'
            ? 'repeat(auto-fill, minmax(260px, 1fr))'
            : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            onClick={() => open(i)}
            style={{
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              aspectRatio: tab === 'headshots' ? '3/4' : '16/10',
              background: '#111',
            }}
            whileHover={{ scale: 1.015 }}
          >
            <img
              src={img.thumb}
              alt={img.label}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.5s ease, filter 0.3s',
              }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.06)'; e.target.style.filter = 'brightness(0.6)' }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.filter = 'brightness(1)' }}
            />
            {/* Hover overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem',
              opacity: 0,
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
            }}
              className="gallery-overlay"
            >
              <ZoomIn size={28} color="#c9a84c" />
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '0.95rem',
                color: '#f5f0eb',
                letterSpacing: '0.08em',
                margin: 0,
                textAlign: 'center',
                padding: '0 1rem',
              }}>{img.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upload hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{
          textAlign: 'center',
          marginTop: '2.5rem',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.7rem',
          color: '#444',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        ↑ Replace placeholder images with your own photos by updating <code style={{ color: '#c9a84c' }}>src/components/Gallery.jsx</code>
      </motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>

      {/* Overlay CSS trick via inline style tag */}
      <style>{`
        .gallery-overlay { opacity: 0; }
        [data-gallery-item]:hover .gallery-overlay { opacity: 1; }
        
        /* Override for hover on the motion div */
        section#gallery div[style*="cursor: pointer"]:hover > div:last-child {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}
