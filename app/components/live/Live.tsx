/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {
  channels,
  updateChannels,
  currentlyPlaying,
  play,
  pause,
  playing,
  updatePlaying,
} from './channelSlice';
import styles from './Live.css';

export default function LiveChannels() {
  const dispatch = useDispatch();
  const channelData = useSelector(channels);
  const playState = useSelector(playing);
  const current = useSelector(currentlyPlaying);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get('https://www.nts.live/api/v2/live')
        .then((res) => dispatch(updateChannels(res.data.results)));
    fetchData();
    setInterval(() => fetchData(), 6000);
  }, [dispatch]);

  const channelComponents = channelData.map(
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
        channel.now.broadcast_title.length >= 50
          ? `${channel.now.broadcast_title.substr(0, 50)}...`
          : channel.now.broadcast_title;
      return (
        <div key={channel.channel_name} className={styles.channel}>
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
                <span className={styles.time}>
                  {`${moment(channel.now.start_timestamp)
                    .locale('uk')
                    .format('LT')} - ${moment(channel.now.end_timestamp)
                    .locale('uk')
                    .format('LT')}`}
                </span>
              </div>
            </div>
            <div className={styles.channel__location}>
              {channel.now.embeds.details.location_long}
            </div>
            {current === channel.channel_name && playState === true ? (
              <button type="button" onClick={() => dispatch(pause())}>
                <svg
                  className={styles.channel__play}
                  width="40px"
                  height="40px"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 600 600"
                >
                  <path
                    d="M446.4 145H153.6c-4.7 0-8.6 3.9-8.6 8.6v292.8c0 4.7 3.9 8.6 8.6 8.6h292.8c4.7 0 8.6-3.9 8.6-8.6V153.6c0-4.7-3.9-8.6-8.6-8.6z"
                    id="Layer_2"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  dispatch(updatePlaying(channel.channel_name));
                  dispatch(play());
                }}
              >
                <svg
                  className={styles.channel__play}
                  width="40px"
                  height="40px"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 600 600"
                >
                  <g transform="translate(-772 -385)">
                    <g id="Drawer" transform="translate(0 43)">
                      <g id="_x32_" transform="translate(18)">
                        <path
                          id="play"
                          d="M1260.4 651.3L882.8 861.2c-4.4 2.4-8.2 2.7-11.2 1-3.1-1.7-4.6-5.1-4.6-10.2V433.2c0-4.8 1.5-8.2 4.6-10.2 3.1-2 6.8-1.7 11.2 1l377.6 210c4.4 2.4 6.6 5.3 6.6 8.7 0 3.3-2.2 6.2-6.6 8.6z"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            )}
          </div>
        </div>
      );
    }
  );

  return <div className={styles.channel__container}>{channelComponents}</div>;
}
