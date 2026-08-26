import { useEffect, useRef, useState } from 'react';
import { createMusicController } from './utils/music';

const weddingDate = new Date('2026-09-16T00:00:00+07:00');
const assetBase = import.meta.env.BASE_URL;
const optimizedImage = (name) => `${assetBase}optimized/${name}`;
const musicSrc = `${assetBase}music/le-duong.mp3`;

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
    value: '12h',
    note: 'Đón khách 11h',
  },
  {
    label: 'Địa điểm',
    value: 'Diamond Palace',
    note: '101 Đ. Lý Chiêu Hoàng, Bình Phú, Hồ Chí Minh',
  },
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
    address: '45B/2 ấp 34 Xã Bình Chánh, Thành phố Hồ Chí Minh',
  },
  {
    title: 'Tiệc Cưới',
    time: 'Đãi tiệc lúc 12h ngày 16/09/2026',
    note: 'Đón khách 11h',
    place: 'Nhà hàng Diamond Palace',
    address: '101 Đ. Lý Chiêu Hoàng, Bình Phú, Hồ Chí Minh',
  },
];

const initialWishes = [
  {
    id: 1,
    name: 'Bảo Trâm',
    guestOf: 'Khách cô dâu',
    message: 'Chúc Hiền & Kiệt trăm năm hạnh phúc, luôn yêu thương và đồng hành cùng nhau trên mọi chặng đường nhé! ❤️',
    time: 'Vừa xong',
  },
  {
    id: 2,
    name: 'Hoàng Nam & Nhóm Bạn',
    guestOf: 'Khách chú rể',
    message: 'Chúc mừng ông bạn Anh Kiệt rước được cô dâu xinh đẹp về dinh! Chúc hai bạn sớm có thiên thần nhỏ!',
    time: '1 giờ trước',
  },
  {
    id: 3,
    name: 'Gia đình Bác Hai',
    guestOf: 'Khách chung',
    message: 'Chúc hai cháu Anh Kiệt và Trần Hiền một đời an yên, tràn ngập tiếng cười và hạnh phúc viên mãn.',
    time: 'Hôm qua',
  },
];

const mapLocations = {
  banquet: {
    title: 'Trung Tâm Tiệc Cưới Diamond Palace',
    subtitle: 'Nơi diễn ra tiệc mừng đám cưới',
    address: '101 Đ. Lý Chiêu Hoàng, Phường 10, Bình Phú, Hồ Chí Minh',
    time: 'Đón khách 11:00 • Đãi tiệc 12:00 (16/09/2026)',
    embedUrl: 'https://maps.google.com/maps?q=101%20%C4%90.%20L%C3%BD%20Chi%C3%AAu%20Ho%C3%A0ng%2C%20Ph%C6%B0%E1%BB%9Dng%2010%2C%20B%C3%ACnh%20Ph%C3%BA%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=101%20%C4%90.%20L%C3%BD%20Chi%C3%AAu%20Ho%C3%A0ng%2C%20Ph%C6%B0%E1%BB%9Dng%2010%2C%20B%C3%ACnh%20Ph%C3%BA%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh',
  },
  ceremony: {
    title: 'Hôn Lễ Tại Tư Gia',
    subtitle: 'Nơi tổ chức nghi lễ thành hôn',
    address: '45B/2 ấp 34 Xã Bình Chánh, Thành phố Hồ Chí Minh',
    time: 'Cử hành lễ lúc 09:00 (16/09/2026)',
    embedUrl: 'https://maps.google.com/maps?q=45B/2%20%E1%BA%A5p%2034%20X%C3%A3%20B%C3%ACnh%20Ch%C3%A1nh%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=45B/2%20%E1%BA%A5p%2034%20X%C3%A3%20B%C3%ACnh%20Ch%C3%A1nh%20H%E1%BB%93%20Ch%C3%AD%20Minh',
  },
};

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

  const [activeMapTab, setActiveMapTab] = useState('banquet');
  const [toastMessage, setToastMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: 'attending',
    guestOf: 'both',
    guestCount: '1',
    message: '',
  });

  const [rsvpSubmission, setRsvpSubmission] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvp_hien_kiet');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_hien_kiet');
      return saved ? JSON.parse(saved) : initialWishes;
    } catch {
      return initialWishes;
    }
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Vui lòng nhập Họ và tên của bạn.');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Vui lòng nhập Số điện thoại liên hệ.');
      return;
    }

    const newSubmission = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem('wedding_rsvp_hien_kiet', JSON.stringify(newSubmission));
    } catch (err) {
      console.error(err);
    }
    setRsvpSubmission(newSubmission);

    if (formData.message.trim()) {
      const guestOfLabel =
        formData.guestOf === 'groom'
          ? 'Khách chú rể'
          : formData.guestOf === 'bride'
          ? 'Khách cô dâu'
          : 'Khách chung';

      const newWish = {
        id: Date.now(),
        name: formData.name.trim(),
        guestOf: guestOfLabel,
        message: formData.message.trim(),
        time: 'Vừa xong',
      };

      const updatedWishes = [newWish, ...wishes];
      setWishes(updatedWishes);
      try {
        localStorage.setItem('wedding_wishes_hien_kiet', JSON.stringify(updatedWishes));
      } catch (err) {
        console.error(err);
      }
    }

    showToast('🎉 Cảm ơn bạn đã xác nhận tham dự!');
  };

  const handleEditRsvp = () => {
    if (rsvpSubmission) {
      setFormData({
        name: rsvpSubmission.name || '',
        phone: rsvpSubmission.phone || '',
        status: rsvpSubmission.status || 'attending',
        guestOf: rsvpSubmission.guestOf || 'both',
        guestCount: rsvpSubmission.guestCount || '1',
        message: rsvpSubmission.message || '',
      });
    }
    setRsvpSubmission(null);
  };

  const handleCopyAddress = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('📋 Đã sao chép địa chỉ vào bộ nhớ tạm!');
    } else {
      showToast('Địa chỉ: ' + text);
    }
  };

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
  }, [coverState, rsvpSubmission]);

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
                    width="600"
                    height="900"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                <p className="eyebrow">Thiệp cưới online</p>
                <h2>Anh Kiệt & Trần Hiền</h2>
                <span>16/09/2026 • Đón khách 11h • Đãi tiệc 12h</span>
              </div>

              <div className="invitation-panel invitation-panel-left">
                <div className="invitation-panel-inner">
                  <div className="invitation-panel-art">
                    <img
                      src={optimizedImage('cover-left.jpeg')}
                      alt="Cô dâu chú rể trong khu vườn hoa"
                      width="600"
                      height="900"
                      loading="eager"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </div>
                  <p className="eyebrow">Save the Date</p>
                  <h2>Anh Kiệt</h2>
                  <span>Trân trọng báo tin vui</span>
                </div>
              </div>

              <div className="invitation-panel invitation-panel-right">
                <div className="invitation-panel-inner">
                  <div className="invitation-panel-art">
                    <img
                      src={optimizedImage('cover-right.jpeg')}
                      alt="Tà váy cưới trải dài trong khu vườn"
                      width="600"
                      height="900"
                      loading="eager"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </div>
                  <p className="eyebrow">Wedding Day</p>
                  <h2>Trần Hiền</h2>
                  <span>16/09/2026 • 06 tháng 8 Âm lịch</span>
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
              Anh Kiệt
              <span>&</span>
              Trần Hiền
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
                <strong>12h</strong>
              </div>
              <div>
                <span>Âm lịch</span>
                <strong>06 tháng 8</strong>
              </div>
              <div>
                <span>Địa chỉ</span>
                <strong>101 Đ. Lý Chiêu Hoàng, Bình Phú, Hồ Chí Minh</strong>
              </div>
            </div>

            <div className="hero-actions">
              <a className="hero-button" href="#rsvp">
                💌 Xác nhận tham dự
              </a>
              <a className="hero-link" href="#map-footer">
                📍 Ghim vị trí bản đồ
              </a>
            </div>
          </div>

          <div className="hero-visual" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <div className="photo-frame photo-frame-main">
              <img
                src={optimizedImage('A5_08702.jpg')}
                alt="Ảnh cưới của Trần Hiền và Anh Kiệt"
                width="1067"
                height="1600"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
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
              <h3>Đãi tiệc lúc 12h ngày 16/09/2026</h3>
              <span>Đón khách 11h • Nhằm 06 tháng 8 Âm lịch</span>
            </article>

            <article className="event-panel">
              <p>Địa chỉ</p>
              <h3>Diamond Palace 101 Đ. Lý Chiêu Hoàng</h3>
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
            <h2>Câu chuyện nên duyên của chúng tôi</h2>
          </div>

          <div className="gallery-story" data-reveal style={{ '--reveal-delay': '70ms' }}>
            <p>
              Mọi thứ bắt đầu lúc cả 2 còn thời cắp sách đến trường, chúng tôi học cùng trường với nhau, chú rể đã say nắng cô
              dâu từ khoảng thời gian ấy, sau hơn 12 năm cả 2 vô tình tìm thấy nhau
              và 1 lần nữa, từ đó là nơi tình yêu bắt đầu. Khi cả 2 đã trưởng thành, mọi thứ đã thay đổi nhiều kể từ lần rung động trước đó, thì 2 con người ấy giờ đã trưởng thành đến với nhau, chứ không còn là mối tình thời học trò.
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
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width="1066"
                  height="1600"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
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

        {/* SECTION: FORM XÁC NHẬN THAM GIA (RSVP FORM & GUESTBOOK WISHES) */}
        <section
          className="rsvp-section section"
          id="rsvp"
          data-reveal
          style={{ '--reveal-delay': '55ms' }}
        >
          <div className="section-heading text-center">
            <p className="eyebrow">Xác nhận tham dự</p>
          </div>

          <div className="rsvp-container">
            {rsvpSubmission ? (
              <div className="rsvp-success-card" data-reveal>
                <div className="rsvp-success-badge">❤️ Đã Xác Nhận Phản Hồi</div>
                <h3>Cảm ơn {rsvpSubmission.name}!</h3>
                <p className="rsvp-success-desc">
                  {rsvpSubmission.status === 'attending'
                    ? `Chúng mình rất vinh hạnh được đón tiếp bạn ${
                        rsvpSubmission.guestCount !== '1' ? `và ${Number(rsvpSubmission.guestCount) - 1} người đi cùng` : ''
                      } tại tiệc mừng vào ngày 16/09/2026!`
                    : 'Cảm ơn bạn đã gửi lời báo tin. Dù không thể thu xếp đến dự, sự quan tâm của bạn vẫn là món quà tuyệt vời dành cho dâu rể!'}
                </p>

                <div className="rsvp-summary-box">
                  <div className="rsvp-summary-item">
                    <span>Trạng thái:</span>
                    <strong>{rsvpSubmission.status === 'attending' ? '🎉 Sẽ tham dự tiệc' : '💌 Rất tiếc không thể tham dự'}</strong>
                  </div>
                  <div className="rsvp-summary-item">
                    <span>Khách của:</span>
                    <strong>
                      {rsvpSubmission.guestOf === 'groom'
                        ? 'Chú rể Anh Kiệt'
                        : rsvpSubmission.guestOf === 'bride'
                        ? 'Cô dâu Trần Hiền'
                        : 'Cả hai bạn'}
                    </strong>
                  </div>
                  {rsvpSubmission.status === 'attending' && (
                    <div className="rsvp-summary-item">
                      <span>Số lượng tham dự:</span>
                      <strong>{rsvpSubmission.guestCount} người</strong>
                    </div>
                  )}
                  {rsvpSubmission.phone && (
                    <div className="rsvp-summary-item">
                      <span>Số điện thoại:</span>
                      <strong>{rsvpSubmission.phone}</strong>
                    </div>
                  )}
                  {rsvpSubmission.message && (
                    <div className="rsvp-summary-item rsvp-summary-full">
                      <span>Lời chúc đã gửi:</span>
                      <em>"{rsvpSubmission.message}"</em>
                    </div>
                  )}
                </div>

                <div className="rsvp-success-actions">
                  <button type="button" className="rsvp-btn rsvp-btn-outline" onClick={handleEditRsvp}>
                    ✏️ Sửa phản hồi
                  </button>
                  <a href="#map-footer" className="rsvp-btn rsvp-btn-primary">
                    📍 Xem vị trí bản đồ
                  </a>
                </div>
              </div>
            ) : (
              <form className="rsvp-form" onSubmit={handleRsvpSubmit}>
                <div className="form-group-grid">
                  <div className="form-group">
                    <label htmlFor="rsvp-name">
                      Họ và tên của bạn <span className="req">*</span>
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rsvp-phone">
                      Số điện thoại <span className="req">*</span>
                    </label>
                    <input
                      id="rsvp-phone"
                      type="tel"
                      required
                      placeholder="Ví dụ: 0901234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Xác nhận sự có mặt của bạn</label>
                  <div className="rsvp-chip-group">
                    <button
                      type="button"
                      className={`chip-button ${formData.status === 'attending' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, status: 'attending' })}
                    >
                      <span className="chip-icon">🎉</span> Sẽ tham dự tiệc
                    </button>
                    <button
                      type="button"
                      className={`chip-button ${formData.status === 'absent' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, status: 'absent' })}
                    >
                      <span className="chip-icon">💌</span> Rất tiếc không thể đến
                    </button>
                  </div>
                </div>

                <div className="form-group-grid">
                  <div className="form-group">
                    <label htmlFor="rsvp-guestof">Bạn là khách của ai?</label>
                    <select
                      id="rsvp-guestof"
                      value={formData.guestOf}
                      onChange={(e) => setFormData({ ...formData, guestOf: e.target.value })}
                    >
                      <option value="both">Khách chung hai gia đình</option>
                      <option value="groom">Khách chú rể (Anh Kiệt)</option>
                      <option value="bride">Khách cô dâu (Trần Hiền)</option>
                    </select>
                  </div>

                  {formData.status === 'attending' && (
                    <div className="form-group">
                      <label htmlFor="rsvp-count">Số người tham dự</label>
                      <select
                        id="rsvp-count"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      >
                        <option value="1">1 người (Đi một mình)</option>
                        <option value="2">2 người (Đi cùng bạn/người thân)</option>
                        <option value="3">3 người (Đi cùng gia đình)</option>
                        <option value="4">4 người trở lên</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="rsvp-message">Lời chúc gửi đến dâu rể</label>
                  <textarea
                    id="rsvp-message"
                    rows="3"
                    placeholder="Viết lời chúc yêu thương của bạn gửi tới Anh Kiệt & Trần Hiền..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="rsvp-submit-btn">
                  ✨ Gửi Xác Nhận Tham Dự
                </button>
              </form>
            )}

            {/* Sổ Lưu Bút Online */}
            {/* <div className="wishes-board">
              <div className="wishes-title-wrap">
                <h3>🌸 Sổ Lưu Bút & Lời Chúc Mừng</h3>
                <span className="wishes-count">{wishes.length} lời chúc</span>
              </div>

              <div className="wishes-grid">
                {wishes.map((w) => (
                  <article className="wish-card" key={w.id}>
                    <div className="wish-header">
                      <strong>{w.name}</strong>
                      <span className="wish-badge">{w.guestOf}</span>
                    </div>
                    <p className="wish-body">"{w.message}"</p>
                    <span className="wish-time">🕒 {w.time}</span>
                  </article>
                ))}
              </div>
            </div> */}
          </div>
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
            Hân hạnh được đón tiếp bạn từ 11h, đãi tiệc lúc 12h ngày 16/09/2026
            tại 101 Đ. Lý Chiêu Hoàng, Phường 10, Bình Phú, Hồ Chí Minh.
          </p>
        </section>

        {/* SECTION: FOOTER GHIM VỊ TRÍ MAP */}
        <footer
          className="footer-map-section section"
          id="map-footer"
          data-reveal
          style={{ '--reveal-delay': '65ms' }}
        >
          <div className="section-heading text-center">
            <p className="eyebrow">Vị trí & Chỉ đường</p>
          </div>

          <div className="map-card-container">
            <div className="map-info-banner">
              <div className="map-info-text">
                <h3>{mapLocations[activeMapTab].title}</h3>
                <p className="map-subtitle">{mapLocations[activeMapTab].subtitle}</p>
                <p className="map-address">📍 {mapLocations[activeMapTab].address}</p>
                <p className="map-time">⏰ {mapLocations[activeMapTab].time}</p>
              </div>

              <div className="map-actions">
                <a
                  href={mapLocations[activeMapTab].directUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="map-btn map-btn-primary"
                >
                  🗺️ Mở Google Maps
                </a>
                <button
                  type="button"
                  className="map-btn map-btn-secondary"
                  onClick={() => handleCopyAddress(mapLocations[activeMapTab].address)}
                >
                  📋 Sao chép địa chỉ
                </button>
              </div>
            </div>

            <div className="map-iframe-wrapper">
              <iframe
                title={mapLocations[activeMapTab].title}
                src={mapLocations[activeMapTab].embedUrl}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="footer-credits">
            <div className="footer-couple-name">Anh Kiệt ❤️ Trần Hiền</div>
            <p>16 tháng 09, 2026 • Cảm ơn bạn đã luôn yêu thương và đồng hành với chúng mình !</p>
            <div className="footer-mini-heart">♡</div>
          </div>
        </footer>
      </main>

      {/* Toast Notification Floating Alert */}
      {toastMessage && <div className="toast-notification">{toastMessage}</div>}
    </>
  );
}

export default App;

