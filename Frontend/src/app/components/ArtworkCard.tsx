import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useState } from 'react';

interface ArtworkCardProps {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  year?: string;
  concentration?: string;
  notes?: string[];
  isNew?: boolean;
}

export function ArtworkCard({
  id,
  name,
  nameAr,
  price,
  image,
  year = '2026',
  concentration = 'Eau de Parfum',
  notes = [],
  isNew = false,
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        {/* Artwork Frame */}
        <div className="relative bg-white border border-[#E8E5E0] transition-all duration-700 hover:border-[#D4D1CC] hover:shadow-soft">
          {/* Inner Frame */}
          <div className="p-8 lg:p-12">
            {/* New Badge */}
            {isNew && (
              <div className="absolute top-4 right-4 z-10">
                <span className="text-xs tracking-widest uppercase text-[#EC4899] font-medium">
                  New
                </span>
              </div>
            )}

            {/* Product Image */}
            <div className="relative aspect-[3/4] mb-8 overflow-hidden">
              <ImageWithFallback
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Hover Overlay with Notes */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6"
              >
                {notes.length > 0 && (
                  <div className="text-center">
                    <p className="text-xs tracking-widest uppercase text-[#A0A0A0] mb-4">
                      Scent Notes
                    </p>
                    <div className="space-y-2">
                      {notes.slice(0, 3).map((note) => (
                        <p key={note} className="text-sm text-[#6B6B6B]">
                          {note}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                <button className="mt-6 text-xs tracking-widest uppercase text-[#101010] hover:text-[#EC4899] transition-colors underline underline-offset-4">
                  View Artwork
                </button>
              </motion.div>
            </div>

            {/* Museum Label */}
            <div className="space-y-3 border-t border-[#E8E5E0] pt-6">
              {/* Title */}
              <div>
                <h3 className="font-display text-xl lg:text-2xl text-[#101010] mb-1 group-hover:text-[#EC4899] transition-colors duration-400">
                  {name}
                </h3>
                <p className="text-sm text-[#6B6B6B] arabic-text">{nameAr}</p>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-[#A0A0A0]">
                <span>{year}</span>
                <span>•</span>
                <span>{concentration}</span>
              </div>

              {/* Price */}
              <div className="pt-2">
                <span className="text-2xl font-display text-[#101010]">${price}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}