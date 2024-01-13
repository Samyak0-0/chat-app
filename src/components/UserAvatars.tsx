import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { useMemo } from 'react';


export const Svgfunc = ({seed}) => {
    const avatar = useMemo(() => {
        return createAvatar(lorelei, {
          size: 128,
          seed: seed,
        }).toDataUriSync();
      }, []);

    return <img src={avatar} alt="Avatar" />;
}
