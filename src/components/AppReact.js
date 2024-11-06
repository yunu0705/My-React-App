import React, { useEffect, useState } from 'react';
import axios from 'axios';
import scheduleStyles from '../schedule.module.css';
import newsStyles from '../news.module.css';
import displayStyles from '../display.module.css';
import picture from '../images/00056-751180854.png';
import picture2 from '../images/icons8-youtube-50.png';
import picture3 from '../images/icons8-ツイッターx-50.png';
import picture4 from '../images/strting-soon1-2048x1152.png';
import Loading from './Loading'; 
import { Helmet } from 'react-helmet';


const Header = () => (
  <header className={displayStyles.header2}>
    <div className={displayStyles.siteTitlebar}>
      <h1 className={displayStyles.siteTitle}>Nekoko's ROOM</h1>
    </div>
  </header>
);

const MainImage = () => (
  <div className={displayStyles.imageContainer2}>
    <img src={picture} className={displayStyles.mainImage} alt="Nekoko" />
  </div>
);

const FollowMe = () => (
  <div className={displayStyles.followMeContainer}>
    <p className={displayStyles.followMeText}>Follow Me</p>
    <p className={displayStyles.followMeText2}>—</p>
    <div className={displayStyles.socialIcons}>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <img src={picture2} className={displayStyles.socialIconsImg} alt="Youtube" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src={picture3} className={displayStyles.socialIconsImg} alt="X" />
      </a>
    </div>
  </div>
);

const ScheduleAndNews = () => {
  const [schedule, setSchedule] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleResponse = await axios.get('https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/schedules?user_id=1');
        const schedules = scheduleResponse.data.schedules;

        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay();
        const mondayOfThisWeek = new Date(currentDate);
        mondayOfThisWeek.setDate(currentDate.getDate() - ((currentDayOfWeek + 6) % 7));
        const sundayOfThisWeek = new Date(mondayOfThisWeek);
        sundayOfThisWeek.setDate(mondayOfThisWeek.getDate() + 6);

        const filteredSchedules = schedules.filter(schedule => {
          const scheduleDate = new Date(schedule.date);
          return scheduleDate >= mondayOfThisWeek && scheduleDate <= sundayOfThisWeek;
        });
        setSchedule(filteredSchedules);

        const newsResponse = await axios.get('https://test-app-peche-c2666ebb3dc5.herokuapp.com/api/news');
        setNews(newsResponse.data.slice(0, 2));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={scheduleStyles.scheduleAndNews}>
      <div id="schedule" className={scheduleStyles.scheduleContainer}>
        <div className={scheduleStyles.scheduleTitle}>今週のスケジュール</div>
        {schedule.length > 0 ? (
          <div className={scheduleStyles.scheduleTable}>
            {schedule.map((item, index) => (
              <div key={index} className={scheduleStyles.scheduleRow}>
                <div className={scheduleStyles.day}>{new Date(item.date).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })} ({item.day_of_week})</div>
                <div className={scheduleStyles.time}>{item.time_range}</div>
                <div className={scheduleStyles.activity}>{item.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={scheduleStyles.scheduleContainer}>
            <img src={picture4} alt="Nekoko" className={scheduleStyles.prepareImage} />
          </div>
        )}
      </div>

      <div className={newsStyles.newsFont1}>News</div>
      <div id="news" className={newsStyles.newsContainer}>
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className={newsStyles.newsItem}>
              {item.category && <div className={newsStyles.newsCategory}>{item.category}</div>}

              {/* URLがある場合は個別の詳細ページに、ない場合は/news-listにリンク */}
              <a href={item.url ? item.url : "/news-list"} className={newsStyles.newsLink}>
                <div className={newsStyles.newsTitle}>{item.title}</div>
              </a>

              {item.content && <div className={newsStyles.newsContext}>{item.content}</div>}
              <div className={newsStyles.newsDate}>{item.date}</div>
            </div>
          ))
        ) : (
          <div className={newsStyles.newsItem}>最新のニュースはありません。</div>
        )}
        <div className={newsStyles.moreButtonPosition}>
          <a href="/news-list" className={newsStyles.moreButton}>More</a>
        </div>
      </div>
    </div>
  );
};


const AppReact = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return <Loading />; // Loadingコンポーネントを表示
  }

  return (
    <>
    <Helmet>
    <title>Nekoko's Room</title>
  </Helmet>
      <Header />
      <main className={displayStyles.main}>
        <MainImage />
        <FollowMe />
        <ScheduleAndNews />
      </main>
    </>
  );
};

export default AppReact;
