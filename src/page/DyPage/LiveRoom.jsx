import ButtonAppBar from '@/components/base/ButtonAppBar/ButtonAppBar';
import { randomBarrage, randomIndex, urlSearchParse } from '@/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Player as PlayerVideo } from 'video-react';
import 'video-react/dist/video-react.css';

export default function LiveRoom(props) {
  const history = useHistory();
  const { roomName, id } = urlSearchParse(history.location.search);
  const [bulletList, setBulletList] = useState(randomBarrage(2));
  const scrollRef = useRef(null);
  const distance = useRef(50);

  useEffect(() => {
    const res = randomBarrage(2);
    let timer = setInterval(() => {
      setBulletList((state) => {
        return state.concat(randomBarrage(randomIndex(1, 3)));
      });
      distance.current = distance.current + 60;
      scrollRef.current.scrollTo(0, distance.current);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div>
      <ButtonAppBar title={roomName} />
      <PlayerVideo
        playsInline
        poster='/assets/poster.png'
        src='https://heishenhua.com/video/b1/gamesci_wukong.mp4'
      />
      <div
        className='p-1 barrage-scroll'
        ref={scrollRef}
        style={{ overflowY: 'auto', height: '9.72222222rem' }}
      >
        <div className='c-chat'>
          {bulletList.map((v, i) => {
            return (
              <p key={i} className='dm-item'>
                <span>
                  <i className={'level' + ' level-' + v?.lv} />
                  {v?.nickName}
                </span>
                ：{v?.content}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
