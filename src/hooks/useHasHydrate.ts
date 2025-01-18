import { useEffect, useState } from "react";

const useHasHydrate = () => {
  const [hasHydrate, setHasHydrate] = useState(false);

  useEffect(() => setHasHydrate(true), []);

  return { hasHydrate };
};

export default useHasHydrate;
