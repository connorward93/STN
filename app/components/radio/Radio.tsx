/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {
  play,
  pause,
  playing,
  updatePlayer,
  updateSource,
  updateDetails,
  currentSource,
  currentPlayer,
} from '../common/playerSlice';
import Loading from '../common/Loading';
import styles from './Radio.css';

export default function Radio() {
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const playState = useSelector(playing);
  const current = useSelector(currentSource);
  const player = useSelector(currentPlayer);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/live')
        .then((res) => setChannels(res.data.results))
        .then(() => setLoading(false));
    fetchData();
    setInterval(() => fetchData(), 6000);
  }, [dispatch]);

  const channelComponents = channels.map(
    (channel: {
      channel_name: string;
      now: {
        broadcast_title: string;
        start_timestamp: string;
        end_timestamp: string;
        embeds: {
          details: {
            media: {
              background_medium_large: string;
              background_large: string;
            };
            description: string;
            location_long: string;
            genres: [{ value: string }];
          };
        };
      };
      next: { broadcast_title: string };
    }) => {
      const desc =
        channel.now.broadcast_title.length >= 46
          ? `${channel.now.broadcast_title.substr(0, 46)}...`
          : channel.now.broadcast_title;
      const time = `${moment(channel.now.start_timestamp)
        .locale('uk')
        .format('LT')} - ${moment(channel.now.end_timestamp)
        .locale('uk')
        .format('LT')}`;
      return (
        <div
          key={channel.channel_name}
          className={styles.channel}
          onClick={() => {
            if (current === channel.channel_name && playState === true) {
              dispatch(pause());
            } else {
              dispatch(updatePlayer('channel'));
              dispatch(updateSource(channel.channel_name));
              dispatch(
                updateDetails({
                  title: desc,
                  subtitle: time,
                  picture: channel.now.embeds.details.media.background_large,
                })
              );
              dispatch(play());
            }
          }}
          role="button"
          tabIndex={0}
          aria-hidden="true"
        >
          <div className={styles.channel__overlay} />
          <div
            className={styles.channel__thumbnail}
            style={{
              backgroundImage: `url(
                ${channel.now.embeds.details.media.background_large}
              )`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className={styles.channel__title}>
              <span className={styles.channel__icon}>
                {channel.channel_name}
              </span>
              <div className={styles.channel__description}>
                <h5
                  dangerouslySetInnerHTML={{
                    __html: desc,
                  }}
                />
                <span className={styles.time}>{time}</span>
              </div>
            </div>
            <div className={styles.channel__location}>
              {channel.now.embeds.details.location_long}
            </div>
            {current === channel.channel_name &&
            playState === true &&
            player === 'channel' ? (
              <svg
                className={styles.channel__play}
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M6 6h12v12H6z" />
              </svg>
            ) : (
              <svg
                className={styles.channel__play}
                width="40px"
                height="40px"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      );
    }
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`${styles.channel__container} ${
            player && styles.active__player
          }`}
        >
          {channelComponents}
        </div>
      )}
    </>
  );
}
