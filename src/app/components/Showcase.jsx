import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Showcase = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  useGSAP(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#showcase',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to('.mask img', {
          transform: 'scale(1.1)',
        })
        .to('.content', { opacity: 1, y: 0, ease: 'power1.in' });
    }
  }, [isTablet]);

  return (
    <div id='showcase'>
      <div className='media'>
        <video src='/videos/moonvid.mp4' loop muted autoPlay playsInline />
        <div className='mask'>
          <img src='/MeuMeu-mask.svg' />
        </div>
      </div>

      <div className='content'>
        <div className='wrapper'>
          <div className='lg:max-w-md text-left'>
            <h2>The Moon</h2>

            <div className='space-y-5 mt-7 pe-10'>
              <p>
                Introducing{' '}
                <span className='text-white'>
                  Meu Meu Magic, the next level of a love story,
                </span>
                . with sun and moon powers
              </p>
              <p>
                It powers the rhythm of the heavens, <br />
                two forces drawn together across time and tide. <br />
                The Sun, radiant and bold. The Moon, calm and eternal. <br />
                Together, they create light and shadow, warmth and wonder...{' '}
                <br />
                in perfect harmony.
              </p>
              <p>
                A new kind of brilliance rises when they meet. Each glance, a
                flare of gold on silver. Each eclipse, a masterpiece of gravity
                and grace. Their connection delivers breathtaking balance, a
                dance of distance, precision, and devotion.
              </p>
              <p className='text-slate-300'>
                And through every dawn and dusk, their love writes the sky anew.
              </p>
            </div>
          </div>

          <div className='max-w-3xs space-y-14 text-left'>
            <div className='space-y-2'>
              <p>Dreamlike</p>
              <h3>Eternal</h3>
              <p>Real in this life</p>
            </div>
            <div className='space-y-2'>
              <p>A love</p>
              <h3>20x stronger</h3>
              <p>With a magnetic connection</p>
              <p>Story of the...</p>
              <h3>The Moon and The Sun</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Showcase;
