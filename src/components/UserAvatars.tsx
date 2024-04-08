import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { useMemo } from 'react';


export const Svgfunc = ({ seed, sizze }) => {
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: sizze,
      seed: seed,
    }).toDataUriSync();
  }, []);

  return (
    <>
      <img src={avatar} alt="Avatar" />
    </>
  );
}
