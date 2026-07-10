import { useEffect, useRef, useState } from 'react';
import { createMusicController } from './utils/music';

const weddingDate = new Date('2026-09-16T00:00:00+07:00');
const assetBase = import.meta.env.BASE_URL;
const optimizedImage = (name) => `${assetBase}optimized/${name}`;
const musicSrc = `${assetBase}music/music.mp3`;

function getRemainingTime() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
      completed: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    completed: false,
  };
}

const detailCards = [
  {
    label: 'Dương lịch',
    value: '16/09/2026',
    note: 'Thứ Tư',
  },
  {
    label: 'Giờ đãi tiệc',
    value: '11h30',
    note: 'Đón khách 11g',
  },
  {
    label: 'Địa điểm',
    value: 'Diamond Place',
    note: '101 Đ. Lý Chiêu Hoàng, Bình Phú, Hồ Chí Minh',
  },
];

const highlights = [
  'Một lời mời nhỏ cho ngày đặc biệt nhất của chúng mình.',
  'Thiết kế tối giản để dễ chia sẻ qua điện thoại, Messenger và Zalo.',
  'Sẵn sàng bổ sung địa điểm, lịch trình và form xác nhận tham dự khi bạn muốn.',
];

const galleryPhotos = [
  {
    src: optimizedImage('A5_09426.jpg'),
    alt: 'Cô dâu chú rể mỉm cười trong khung hình save the date',
    caption: 'Save the date',
  },
  {
    src: optimizedImage('A5_08480.jpg'),
    alt: 'Cô dâu chú rể nắm tay và ngoái nhìn máy ảnh',
    caption: 'Ánh nhìn hạnh phúc',
  },
  {
    src: optimizedImage('A5_09234.jpg'),
    alt: 'Cô dâu chú rể giữa cánh hoa rơi',
    caption: 'Khoảnh khắc ngọt ngào',
  },
];

const floatingHearts = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 8) % 84)}%`,
  delay: `${(index % 6) * -1.1}s`,
  duration: `${11 + (index % 5) * 1.4}s`,
  size: `${14 + (index % 4) * 6}px`,
}));

const fireworks = [
  { id: 'fw-1', top: '10%', left: '8%', delay: '0s', duration: '4.8s' },
  { id: 'fw-2', top: '16%', right: '10%', delay: '-1.4s', duration: '5.2s' },
  { id: 'fw-3', top: '42%', left: '3%', delay: '-2.1s', duration: '5.6s' },
  { id: 'fw-4', top: '56%', right: '6%', delay: '-3s', duration: '4.9s' },
  { id: 'fw-5', top: '76%', left: '14%', delay: '-1.8s', duration: '5.4s' },
  { id: 'fw-6', top: '84%', right: '16%', delay: '-2.7s', duration: '5.1s' },
];

const weddingSchedule = [
  {
    title: 'Hôn Lễ Tại Tư Gia',
    time: '9h ngày 16/09/2026',
    place: 'Tại tư gia',
    address: '45B/2 Xã Bình Chánh, Thành phố Hồ Chí Minh',
  },
  {
    title: 'Tiệc Cưới',
    time: 'Đãi tiệc lúc 11h30 ngày 16/09/2026',
    note: 'Đón khách 11g',
    place: 'Nhà hàng Diamond Place',
    address: '101 Đ. Lý Chiêu Hoàng, Bình Phú, Hồ Chí Minh',
  },
];

function App() {
  const [coverState, setCoverState] = useState('closed');
  const [remainingTime, setRemainingTime] = useState(getRemainingTime);
  const openTimerRef = useRef(null);
  const musicControllerRef = useRef(
    createMusicController({
      src: musicSrc,
      volume: 0.32,
      loop: true,
    }),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('invitation-locked', coverState !== 'opened');

    return () => {
      document.body.classList.remove('invitation-locked');
    };
  }, [coverState]);

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(openTimerRef.current);
      musicControllerRef.current.destroy();
    },
    [],
  );

  function handleOpenInvitation() {
    if (coverState !== 'closed') {
      return;
    }

    void musicControllerRef.current.play();
    setCoverState('opening');
    openTimerRef.current = window.setTimeout(() => {
      setCoverState('opened');
    }, 1450);
  }

  const countdownItems = [
    { label: 'Ngày', value: remainingTime.days },
    { label: 'Giờ', value: remainingTime.hours },
    { label: 'Phút', value: remainingTime.minutes },
    { label: 'Giây', value: remainingTime.seconds },
  ];

  return (
    <>
      {coverState !== 'opened' && (
        <div className={`invitation-overlay invitation-overlay--${coverState}`}>
          <div className="invitation-stage">
            <div className={`invitation-book invitation-book--${coverState}`}>
              <div className="heart-cluster heart-cluster-cover" aria-hidden="true">
                <span className="heart heart-cover-1" />
                <span className="heart heart-cover-2" />
                <span className="heart heart-cover-3" />
              </div>
              <div className="invitation-center">
                <div className="invitation-center-photo">
                  <img
                    src={optimizedImage('cover-center.jpeg')}
                    alt="Khoảnh khắc cô dâu chú rể dưới lớp voan"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                <p className="eyebrow">Thiệp cưới online</p>
                <h2>Trần Hiền & Anh Kiệt</h2>
                <span>16/09/2026 • Đón khách 11g • Đãi tiệc 11h30</span>
              </div>

              <div className="invitation-panel invitation-panel-left">
                <div className="invitation-panel-inner">
                  <div className="invitation-panel-art">
                    <img
                      src={optimizedImage('cover-left.jpeg')}
                      alt="Cô dâu chú rể trong khu vườn hoa"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <p className="eyebrow">Save the Date</p>
                  <h2>Trần Hiền</h2>
                  <span>Trân trọng báo tin vui</span>
                </div>
              </div>

              <div className="invitation-panel invitation-panel-right">
                <div className="invitation-panel-inner">
                  <div className="invitation-panel-art">
                    <img
                      src={optimizedImage('cover-right.jpeg')}
                      alt="Tà váy cưới trải dài trong khu vườn"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <p className="eyebrow">Wedding Day</p>
                  <h2>Anh Kiệt</h2>
                  <span>16/09/2026 • 06/08 Âm lịch</span>
                </div>
              </div>
            </div>

            <button
              className="invitation-open-button"
              type="button"
              onClick={handleOpenInvitation}
              disabled={coverState !== 'closed'}
            >
              {coverState === 'opening' ? 'Đang mở thiệp...' : 'Mở thiệp'}
            </button>
          </div>
        </div>
      )}

      <main className={`page-shell ${coverState === 'opened' ? 'page-shell--ready' : ''}`}>
      <div className="fireworks-layer" aria-hidden="true">
        {fireworks.map((firework) => (
          <span
            key={firework.id}
            className="firework"
            style={{
              top: firework.top,
              left: firework.left,
              right: firework.right,
              '--firework-delay': firework.delay,
              '--firework-duration': firework.duration,
            }}
          />
        ))}
      </div>
      <div className="floating-hearts-layer" aria-hidden="true">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              '--heart-size': heart.size,
              '--heart-delay': heart.delay,
              '--heart-duration': heart.duration,
            }}
          />
        ))}
      </div>
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="ornament ornament-one" />
      <div className="ornament ornament-two" />
      <div className="ornament ornament-three" />
      <div className="heart-cluster heart-cluster-page" aria-hidden="true">
        <span className="heart heart-page-1" />
        <span className="heart heart-page-2" />
        <span className="heart heart-page-3" />
        <span className="heart heart-page-4" />
      </div>

      <section className="hero section">
        <div className="hero-copy" data-reveal style={{ '--reveal-delay': '0ms' }}>
          <p className="eyebrow">Wedding Invitation</p>
          <h1>
            Trần Hiền
            <span>&</span>
            Anh Kiệt
          </h1>
          <p className="hero-text">
            Chúng mình trân trọng mời bạn cùng lưu lại ngày vui và đồng hành trong
            khoảnh khắc bắt đầu một hành trình mới.
          </p>

          <div className="hero-meta">
            <div>
              <span>Ngày cưới</span>
              <strong>16 tháng 09, 2026</strong>
            </div>
            <div>
              <span>Giờ đãi tiệc</span>
              <strong>11h30</strong>
            </div>
            <div>
              <span>Âm lịch</span>
              <strong>06/08</strong>
            </div>
            <div>
              <span>Địa chỉ</span>
              <strong>101 Đ. Lý Chiêu Hoàng, Bình Phú, Hồ Chí Minh</strong>
            </div>
          </div>

          <div className="hero-actions">
            <a className="hero-button" href="#countdown">
              Xem đếm ngược ngày cưới
            </a>
            <a
              className="hero-link"
              href="https://www.google.com/maps/search/?api=1&query=101%20%C4%90.%20L%C3%BD%20Chi%C3%AAu%20Ho%C3%A0ng%2C%20Ph%C6%B0%E1%BB%9Dng%2010%2C%20B%C3%ACnh%20Ph%C3%BA%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh"
              target="_blank"
              rel="noreferrer"
            >
              Xem địa chỉ trên bản đồ
            </a>
          </div>
        </div>

        <div className="hero-visual" data-reveal style={{ '--reveal-delay': '120ms' }}>
          <div className="photo-frame photo-frame-main">
            <img
              src={optimizedImage('A5_08702.jpg')}
              alt="Ảnh cưới của Trần Hiền và Anh Kiệt"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="floating-card">
            <span>Save the Date</span>
            <strong>16.09.2026</strong>
          </div>
        </div>
      </section>

      <section className="details-grid section" aria-label="Thông tin ngày cưới">
        {detailCards.map((card, index) => (
          <article
            className="detail-card"
            key={card.label}
            data-reveal
            style={{ '--reveal-delay': `${index * 90}ms` }}
          >
            <p>{card.label}</p>
            <h2>{card.value}</h2>
            <span>{card.note}</span>
          </article>
        ))}
      </section>

      <section className="event-info section" data-reveal style={{ '--reveal-delay': '40ms' }}>
        <div className="section-heading">
          <p className="eyebrow">Thông tin buổi tiệc</p>
          <h2>Trân trọng kính mời bạn đến chung vui cùng gia đình</h2>
        </div>

        <div className="event-info-grid">
          <article className="event-panel">
            <p>Thời gian</p>
            <h3>Đãi tiệc lúc 11h30 ngày 16/09/2026</h3>
            <span>Đón khách 11g • Nhằm 06/08 Âm lịch</span>
          </article>

          <article className="event-panel">
            <p>Địa chỉ</p>
            <h3>Diamond Place 101 Đ. Lý Chiêu Hoàng</h3>
            <span>Phường 10, Bình Phú, Hồ Chí Minh</span>
          </article>
        </div>
      </section>

      <section
        className="wedding-schedule section"
        data-reveal
        style={{ '--reveal-delay': '45ms' }}
      >
        <div className="section-heading">
          <p className="eyebrow">Thông tin lễ cưới</p>
          <h2>Những cột mốc quan trọng trong ngày vui của chúng mình</h2>
        </div>

        <div className="wedding-schedule-grid">
          {weddingSchedule.map((item, index) => (
            <article
              className="schedule-card"
              key={item.title}
              data-reveal
              style={{ '--reveal-delay': `${index * 110}ms` }}
            >
              <h3>{item.title}</h3>
              <div className="schedule-block">
                <p>Thời gian</p>
                <strong>{item.time}</strong>
                <span>{item.note}</span>
              </div>
              <div className="schedule-block">
                <p>Địa điểm</p>
                <strong>{item.place}</strong>
                <span>{item.address}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery section" data-reveal style={{ '--reveal-delay': '50ms' }}>
        <div className="section-heading">
          <p className="eyebrow">Khoảnh khắc</p>
          <h2>Công chuyện nên duyên của chúng tôi</h2>
        </div>

        <div className="gallery-story" data-reveal style={{ '--reveal-delay': '70ms' }}>
          <p>
            Mọi thứ bắt đầu lúc cả 2 còn là học sinh cấp 3, chú rễ đã say đắm cô
            dâu từ khoảng thời gian ấy, sau hơn 12 năm cả 2 vô tình tìm thấy nhau
            và 1 lần nữa, đó là nơi tình yêu bắt đầu.
          </p>
          <p>
            Hành trình gần 2 năm qua là những tháng ngày cùng nhau trưởng thành,
            chia sẻ niềm vui và vượt qua thử thách. Tình yêu của chúng tôi không
            hào nhoáng, mà lặng lẽ, sâu sắc và bền chặt như những trang sách cũ kỹ
            nhưng vô giá.
          </p>
          <p className="gallery-story-signature">
            “Cảm ơn vì đã luôn ở bên nhau.” — Anh Kiệt & Trần Hiền
          </p>
        </div>

        <div className="gallery-grid">
          {galleryPhotos.map((photo, index) => (
            <figure
              className={`gallery-card gallery-card-${index + 1}`}
              key={photo.src}
              data-reveal
              style={{ '--reveal-delay': `${index * 120}ms` }}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="countdown section"
        id="countdown"
        data-reveal
        style={{ '--reveal-delay': '60ms' }}
      >
        <div className="section-heading">
          <p className="eyebrow">Counting Down</p>
          <h2>Đếm ngược đến ngày về chung một nhà</h2>
        </div>

        <div className="countdown-grid" aria-live="polite">
          {countdownItems.map((item, index) => (
            <div
              className="countdown-card"
              key={item.label}
              data-reveal
              style={{ '--reveal-delay': `${index * 100}ms` }}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <p className="countdown-note">
          {remainingTime.completed
            ? 'Hôm nay là ngày cưới của Trần Hiền và Anh Kiệt.'
            : 'Cảm ơn bạn đã lưu lại ngày đặc biệt này cùng chúng mình.'}
        </p>
      </section>

      <section className="closing section" data-reveal style={{ '--reveal-delay': '70ms' }}>
        <div className="closing-heartline" aria-hidden="true">
          <span className="heart heart-inline" />
          <span className="heart heart-inline heart-inline-delay" />
        </div>
        <p className="eyebrow">Lời nhắn</p>
        <blockquote>
          “Sự hiện diện của bạn là món quà quý giá nhất trong ngày vui của chúng
          mình.”
        </blockquote>
        <p>
          Hân hạnh được đón tiếp bạn từ 11g, đãi tiệc lúc 11h30 ngày 16/09/2026
          tại 101 Đ. Lý Chiêu Hoàng, Phường 10, Bình Phú, Hồ Chí Minh.
        </p>
      </section>
      </main>
    </>
  );
}

export default App;
