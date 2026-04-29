import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Search, Trash2, Download, Copy, Check } from 'lucide-react';

export function MediaLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Mock media files
  const mediaFiles = [
    { id: 1, name: 'oud-royal.jpg', url: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?w=800', size: '245 KB', date: '2026-02-10' },
    { id: 2, name: 'amber-nights.jpg', url: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?w=800', size: '312 KB', date: '2026-02-10' },
    { id: 3, name: 'rose-mystique.jpg', url: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?w=800', size: '198 KB', date: '2026-02-10' },
    { id: 4, name: 'musk-noir.jpg', url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800', size: '267 KB', date: '2026-02-09' },
    { id: 5, name: 'saffron-gold.jpg', url: 'https://images.unsplash.com/photo-1615309258975-226d9be6a8c6?w=800', size: '289 KB', date: '2026-02-09' },
    { id: 6, name: 'white-lotus.jpg', url: 'https://images.unsplash.com/photo-1595255944594-615b28fef523?w=800', size: '234 KB', date: '2026-02-08' },
  ];

  const filteredMedia = mediaFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      console.log('Delete file:', id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-display mb-2">Media Library</h1>
        <p className="text-[#6B6B6B]">Manage product images and assets</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white border-2 border-[#E8E5E0] p-8">
        <div className="border-2 border-dashed border-[#E8E5E0] p-12 text-center hover:border-[#EC4899] transition-colors cursor-pointer">
          <Upload className="w-16 h-16 mx-auto mb-4 text-[#A0A0A0]" />
          <p className="text-lg font-display mb-2">Upload Media Files</p>
          <p className="text-sm text-[#6B6B6B] mb-4">Drag and drop or click to select files</p>
          <p className="text-xs text-[#A0A0A0]">Supported formats: JPG, PNG, WebP (Max 10MB)</p>
          <input type="file" multiple accept="image/*" className="hidden" />
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-2 border-[#E8E5E0] p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media files..."
            className="w-full pl-12 pr-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
          />
        </div>
        <div className="mt-4 pt-4 border-t border-[#E8E5E0]">
          <p className="text-sm text-[#6B6B6B]">
            <strong>{filteredMedia.length}</strong> files • Total size: <strong>1.5 MB</strong>
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border-2 border-[#E8E5E0] hover:shadow-lg transition-shadow group"
          >
            {/* Image Preview */}
            <div className="relative aspect-square overflow-hidden bg-[#FAF7F1]">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-[#101010]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleCopyUrl(file.url)}
                  className="p-3 bg-white rounded-full hover:bg-[#FAF7F1] transition-colors"
                  title="Copy URL"
                >
                  {copiedUrl === file.url ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
                <a
                  href={file.url}
                  download
                  className="p-3 bg-white rounded-full hover:bg-[#FAF7F1] transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-3 bg-white rounded-full hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            {/* File Info */}
            <div className="p-4">
              <p className="text-sm font-medium truncate mb-1" title={file.name}>
                {file.name}
              </p>
              <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                <span>{file.size}</span>
                <span>{file.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-12 bg-white border-2 border-[#E8E5E0]">
          <p className="text-[#6B6B6B] mb-4">No media files found</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-[#EC4899] hover:text-[#A855F7]"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border-2 border-blue-200 p-6">
        <h3 className="font-display text-lg mb-2">💡 Media Library Tips</h3>
        <ul className="text-sm text-[#6B6B6B] space-y-1">
          <li>• Upload high-quality product images for best display quality</li>
          <li>• Click the copy icon to copy the image URL for use in products</li>
          <li>• Recommended image size: 1200x1600px (3:4 aspect ratio)</li>
          <li>• Use descriptive filenames for easy searching</li>
          <li>• Optimize images before uploading to reduce file size</li>
        </ul>
      </div>
    </div>
  );
}
