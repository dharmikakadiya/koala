// src/components/Banner/index.jsx
export default function Banner({ title, subtitle, image }) {

  const getImageUrl = (imgString) => {
    if (!imgString) return '';
    if (imgString.startsWith('http') || imgString.startsWith('data:') || imgString.startsWith('blob:') || imgString.startsWith('/')) return imgString;
    try {
      return new URL(`../../assets/${imgString}`, import.meta.url).href;
    } catch {
      return imgString;
    }
  };

  const imageUrl = getImageUrl(image);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[#f0ede8]" />
      )}
      <div className="absolute inset-0 bg-black/30 flex flex-col items-start justify-end pb-12 px-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-3 text-lg md:text-xl text-white">{subtitle}</p>}
      </div>
    </div>
  );
}