import dynamic from 'next/dynamic';

function Rudsense({type}: {type?: string}) {
  if (type === "thumbs") {
    return (
      <div className="flex justify-center items-center">
        <amp-ad
          width="100vw"
          height="320"
          type="adsense"
          data-ad-client="ca-pub-5476404733919333"
          data-ad-slot="7454306770"
          data-auto-format="mcrspv"
          class="rounded-lg"
          data-full-width=""
        >
          <div overflow="" />
        </amp-ad>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center">
      <amp-ad
        width="100vw"
        height="320"
        type="adsense"
        data-ad-client="ca-pub-5476404733919333"
        data-ad-slot="6598743882"
        data-auto-format="rspv"
        data-full-width=""
        class="rounded-lg"
      >
        <div overflow="" />
      </amp-ad>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Rudsense), {
  ssr: false,
});
