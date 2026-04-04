import { useEffect, useState } from 'react';

const weddingDate = new Date('2026-09-16T00:00:00+07:00');

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
    label: 'Giờ mời',
    value: '11:00 sáng',
    note: '16/09/2026',
  },
  {
    label: 'Địa điểm',
    value: 'Phường 10',
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
    src: '/A5_08425.JPG',
    alt: 'Chân dung cô dâu với bó hoa cưới',
    caption: 'Nét dịu dàng',
  },
  {
    src: '/A5_09376.JPG',
    alt: 'Cô dâu và chú rể đứng cạnh nhau trong khung cửa',
    caption: 'Khoảnh khắc riêng',
  },
  {
    src: '/A5_09442.JPG',
    alt: 'Cô dâu chú rể bên nhau trong studio',
    caption: 'Lời hẹn trăm năm',
  },
];

function App() {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

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

  const countdownItems = [
    { label: 'Ngày', value: remainingTime.days },
    { label: 'Giờ', value: remainingTime.hours },
    { label: 'Phút', value: remainingTime.minutes },
    { label: 'Giây', value: remainingTime.seconds },
  ];

  return (
    <main className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="ornament ornament-one" />
      <div className="ornament ornament-two" />
      <div className="ornament ornament-three" />

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
              <span>Giờ mời</span>
              <strong>11:00 sáng</strong>
            </div>
            <div>
              <span>Âm lịch</span>
              <strong>06/08</strong>
            </div>
            <div>
              <span>Địa chỉ</span>
              <strong>101 Đ. Lý Chiêu Hoàng</strong>
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
            <img src="/hero.jpg" alt="Ảnh cưới của Trần Hiền và Anh Kiệt" />
          </div>
          <div className="hero-stack" aria-label="Bộ ảnh cưới nổi bật">
            <div className="photo-frame photo-frame-small photo-frame-left">
              <img
                src="/A5_09442.JPG"
                alt="Cô dâu và chú rể nhìn nhau trong studio"
              />
            </div>
            <div className="photo-frame photo-frame-small photo-frame-right">
              <img
                src="/A5_08425.JPG"
                alt="Chân dung cô dâu trong ánh nắng"
              />
            </div>
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
            <h3>11h sáng ngày 16/09/2026</h3>
            <span>Nhằm 06/08 Âm lịch</span>
          </article>

          <article className="event-panel">
            <p>Địa chỉ</p>
            <h3>101 Đ. Lý Chiêu Hoàng</h3>
            <span>Phường 10, Bình Phú, Hồ Chí Minh</span>
          </article>
        </div>
      </section>

      <section className="gallery section" data-reveal style={{ '--reveal-delay': '50ms' }}>
        <div className="section-heading">
          <p className="eyebrow">Khoảnh khắc</p>
          <h2>Những bức hình làm trang thiệp sống động hơn</h2>
        </div>

        <div className="gallery-grid">
          {galleryPhotos.map((photo, index) => (
            <figure
              className={`gallery-card gallery-card-${index + 1}`}
              key={photo.src}
              data-reveal
              style={{ '--reveal-delay': `${index * 120}ms` }}
            >
              <img src={photo.src} alt={photo.alt} />
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
        <p className="eyebrow">Lời nhắn</p>
        <blockquote>
          “Sự hiện diện của bạn là món quà quý giá nhất trong ngày vui của chúng
          mình.”
        </blockquote>
        <p>
          Hân hạnh được đón tiếp bạn lúc 11h sáng ngày 16/09/2026 tại 101 Đ. Lý
          Chiêu Hoàng, Phường 10, Bình Phú, Hồ Chí Minh.
        </p>
      </section>
    </main>
  );
}

export default App;
