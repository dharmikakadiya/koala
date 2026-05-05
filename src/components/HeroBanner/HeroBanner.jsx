import { useEffect, useState } from "react";
 

import CategoryGrid from "./CategoryGrid";
import VideoBanner from "./VideoBanner"
import FeaturesGrid from "./FeaturesGrid";
import ImpactSection from "./ImpactSection";

import {
  fetchFeatured,
  fetchBanner,
  fetchFeatures,
  fetchModularBanner,
  fetchImpacts
} from "../../services/api";

export default function HeroBanner() {
  const [featured, setFeatured] = useState([]);
  const [banner, setBanner] = useState(null);
  const [features, setFeatures] = useState([]);
  const [modularBanner, setModularBanner] = useState(null);
  const [impacts, setImpacts] = useState([]);

  useEffect(() => {
    fetchFeatured().then(res => setFeatured(res.data));
    fetchBanner().then(res => setBanner(res.data));
    fetchFeatures().then(res => setFeatures(res.data));
    fetchModularBanner().then(res => setModularBanner(res.data));
    fetchImpacts().then(res => setImpacts(res.data));
  }, []);

  const getImageUrl = (fileName) =>
    new URL(`../../assets/${fileName}`, import.meta.url).href;

  return (
    <div>
      <div className="hidden sm:flex items-center gap-4 lg:gap-8 font-medium"></div>
      <img src="/src/assets/dk.jpeg" />

      <CategoryGrid data={featured} getImageUrl={getImageUrl} />

      {banner && <VideoBanner data={banner} />}

      <FeaturesGrid data={features} getImageUrl={getImageUrl} />

      {modularBanner && <VideoBanner data={modularBanner} />}

      <ImpactSection data={impacts} getImageUrl={getImageUrl} />
    </div>
  );
}