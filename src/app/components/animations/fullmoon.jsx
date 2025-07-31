'use client';
import React, { useState, useEffect } from 'react';
import styles from './TheDrop.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const Fullmoon = () => {
  /*  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3400);
    return () => clearTimeout(timeout);
  }, []); */
  return (
    <AnimatePresence>
      {/*   {isVisible && ( */}
      <motion.div className={styles.fullmoon}>
        <motion.svg
          viewBox='0 0 100 100'
          width='200'
          height='200'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: -150, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 5,
            damping: 3,
            bounce: 0.3,
            duration: 4,
            delay: 2,
          }}
        >
          <g transform='rotate(18.7, 50, 50)'>
            <rect
              id='layer-water'
              x='0'
              y='0'
              width='100'
              height='100'
              fill='rgba(0, 0, 0, 1)'
              mask='url(#water-mask)'
            />
            <rect
              id='layer-ground'
              x='0'
              y='0'
              width='100'
              height='100'
              fill='rgba(200, 200, 200, 1)'
              mask='url(#ground-mask)'
            />
            <rect
              id='layer-atmosphere'
              x='-5'
              y='-5'
              width='110'
              height='110'
              fill='url(#atmosphere-gradient)'
              mask='url(#atmosphere-mask)'
            />
            <circle
              id='layer-glare'
              cx='35'
              cy='35'
              r='20'
              fill='rgba(255, 255, 255, .4)'
              filter='url(#glare-blur-filter)'
            />
          </g>
          <defs>
            <linearGradient
              id='atmosphere-gradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='rgb(255,255,255)' stopOpacity='1' />
              <stop
                offset='100%'
                stopColor='rgb(255,255,255)'
                stopOpacity='0.1'
              />
            </linearGradient>
            <mask id='atmosphere-mask'>
              <rect x='-5' y='-5' width='110' height='110' fill='black' />
              <circle
                cx='50'
                cy='50'
                r='52'
                fill='url(#atmosphere-mask-gradient)'
              />
            </mask>
            <mask id='water-mask'>
              <rect x='0' y='0' width='100' height='100' fill='black' />
              <circle
                cx='50'
                cy='50'
                r='50'
                fill='white'
                filter='url(#fisheye-filter)'
              />
            </mask>
            <mask id='ground-mask'>
              <rect x='0' y='0' width='100' height='100' fill='black' />
              <circle
                cx='50'
                cy='50'
                r='50'
                fill='url(#ground-pattern)'
                filter='url(#fisheye-filter)'
              />
            </mask>
            <mask id='clouds-mask'>
              <rect x='0' y='0' width='100' height='100' fill='black' />
              <circle
                cx='50'
                cy='50'
                r='50'
                fill='url(#clouds-pattern)'
                filter='url(#fisheye-filter)'
              />
            </mask>
            <filter
              id='fisheye-filter'
              x='0%'
              y='0%'
              width='100%'
              height='100%'
            >
              <feGaussianBlur
                in='SourceGraphic'
                stdDeviation='10'
                result='blur'
              />
              <feDisplacementMap in='SourceGraphic' in2='blur' scale='3' />
            </filter>
            <radialGradient
              id='atmosphere-mask-gradient'
              cx='50%'
              cy='50%'
              r='50%'
              fx='50%'
              fy='50%'
            >
              <stop offset='50%' stopColor='white' stopOpacity='0' />
              <stop offset='90%' stopColor='white' stopOpacity='1' />
              <stop offset='100%' stopColor='white' stopOpacity='0' />
            </radialGradient>
            <filter
              id='glare-blur-filter'
              x='-100%'
              y='-100%'
              width='300%'
              height='300%'
            >
              <feGaussianBlur stdDeviation='10' />
            </filter>
            <pattern
              id='ground-pattern'
              patternUnits='userSpaceOnUse'
              x='0'
              y='0'
              width='200'
              height='100'
            >
              <animate
                attributeName='x'
                from='0'
                to='200'
                dur='30s'
                repeatCount='indefinite'
              />
              <image
                x='0'
                y='0'
                width='200'
                height='100'
                href='data:image/jpeg;base64,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'
              />
            </pattern>
            <pattern
              id='clouds-pattern'
              patternUnits='userSpaceOnUse'
              x='0'
              y='0'
              width='200'
              height='100'
            >
              <animate
                attributeName='x'
                from='0'
                to='200'
                dur='60s'
                repeatCount='indefinite'
              />
              <image
                x='0'
                y='0'
                width='200'
                height='100'
                href='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCABkAMgBAREA/8QAHQAAAwADAQEBAQAAAAAAAAAABQYHAwQIAgABCf/EAEEQAAEDAwQBAwMCBAMGAgsAAAECAwQFBhEABxIhMRMiQQgUUTJhFRYjcUKBkQkzUlOhwSTRFyVDYmNzgoOSseH/2gAIAQEAAD8Aj1M3ZoNHuJym3PYtWhRWUFTct+QqOeOfaVs/bOlJ/JyR5GjC/q5tG33W35GwECc24CGUOTGytxok4fCPtUDicdH/APuAFz7117desUmm7S2/ULXqVYWW2GYlNhTIrTqCfbJQqMHGs9ELS4tPH3cTgjU6hyPrNuN51EWmvzvRdKVOGmU/hyz4CuABBx18Y16g2l9XNSqKqXLLEFKlcXXprMBEZsE9grLasjvwnOnumbZ/WFRXEUSgGzHwEZQ87SYJS8T3xQ49GHI958/GpHuxE+pSyKs8bgry0vIdSl4UKUwpll0jtJRHASgf9NID+6e97aG0P3tXmUqJCSp4t5P98DOmShx/qPri4z0O7622qUC5HU7VFIDo/wCJPfY/tp6p1j/WM005FRdFZQ1LHpqX92lxJBPysjKR++ly74u++2pbXuUxcExCV8kuqqDhjLSR4Q6ycd9fOf7a2qBu1QG6dFkVelNVZTqsPRBVKkh9AHypRQWyD+Qv++q41IodyUKmVygbYT6MuWVIZL/9duT8Zw4VLKB8EJGfknQuH9PW89fYeuCl/wAsoYZeH9JFCjrU2k94ytABKR5Byc6YqF9J+6E8Pybg3HmUdhWEtCnW2ypx3kcJ/RxSlPnrlkfjWlcv0pVG3IrlUod+zrifbX6a4KYyH5L2BkhIiKXw8EHlgg41gtT6Qrw3DjPVCNt1cNOSVei2zUak61h3APYDS1JSfgrKfxrDUvoi3itR8x5OzZqqHnFcHmHJEoJSPjLbiVnP5KP89GmPpCqjVPT/ABmz59Ekue0x3GZDKgT/APMkYH/1Yz+Ne3/9n/cjKY6qVdr7j0wjHpzjwZ/ZXHkRj8AHyNL1R+mDeWz2nX7fuuvPuRuz9vyDZH55ODCh+R5/bTHb99732MEUu8otp1xpLYCjVbYdW62T4SVtpRyPR7I0yvbnLuGE/Lf2L2nU2zhLs1yjOtJUnOOlPEJ/6/5a1ZS7VnRW5FA2djIloJWpTVqQpzSsd8GktvoVjOPcVHryO9YTQIkeE7UJ1Du6M0tz1FoiWM+02ynJPtxPIz3jxj8DTbsnQaBUqRSnrsh1Ovy6q2JdarVZQGUl1wdNtJWQpSUA4BSkg/tp5mUDbesuPUti2ZDsWc99ul2PDbS24lvIy4SvmoeMAAA9knGiFQtav0KkBNsg0Kkpa4ylv1Ztl19IPty2hvjxIHQBHgDOpduFAqkihJRTptXqsf7fl93DcQwppWAtCvTQc/ghIyFJBKtKGx27kSHWazGlU6lyaoyysKm1SoeoX3ggjizHbypwjjgFPeCBqgXjae393WWKvedbdpNTUwtoPtlxbkNxZ6LaFukIXkjx3xyM+dc317ZqZQov31H3LkzX0pfmynUOD05IBScJBySo4KiCVeBnGtuyq1Cl06loqdJpFQDjSwmW+zImTG+XXqKaaw2nOQfdxJBBz50RftS4rsjPPQkU2nSreS8ulOyGH4Ykuf8AJQ8HQEAjsNlIBzn5J1mf38m2S1BFYp0l+clxLVRojy1F5pYOCEEk8kn4PnxrVqt31je2pSLbua7Ye37EVRbbo0VkuS3woEqDgxltfEDIUoA5IxkabLF+lfbqo8a43cqxCZCFrV/EGG3Qkj9QQ0VODPRHWr5RNvpM2RDoLG6FMry0xVMU6G5TfV4MNpAUhbiUlZKeslZHx0NA63t+3bLP8SufcKl0VimrUA2qS4G19nm2lLyfZnGPYPg/nOp5ujfn09PMoW3ugimvMsqKG6dCZXh5IHtAUUL7CiBklB/ORqWWFf8AeLUh9ik3JKr1ty3/AEXELYdjPNIyOK1cSpKSR/7wOcjXR9qUtV9qYo53VqdvokER0xIlQSEPLP6UFtSSgLASDkAqyrzpskVK/PpvZkMW4mrXlBVgOsPTmpi2XM4VwJUFJ785JA7ONKdyf7QOm2xXqZDua06iKbOjOf8AhktpcUuQFgcUZOAlPeezkkfGgtifUNSLlrlTua5Lfi0G2PWx944+/HcaPlDRSyeLjqugEoSMAEq89htxfrUgzvUoNkUSbRaY84Esz5dS9RbwC05eJ5K9PHZ4+5XY686I7b730bcW2XEVe+XF1dTqxU0Bol91aQfTeZSnASnCcjHeAeWCTojO272nuSQiZUJ9x1D1ElSltqQ0zIODlGe+Izgn24GfjUenfWvQLSrK6JaO1z0GJFKmjNNfdccWoAp4LGAnyAOQX1jI0rsfVzvPV2Zc7+ZLjpNPkvuRob1HnpcZgufDbiXEqUtAH57Oc8jjuxhVZpt1N23QLwkPpnwlPLSy0QtLgzgqSTnHQwD2fPtOMi9zL8psKmm0rhqq5Tsd30fVhyUtOhJSCUnBJAwcjsnyD+Bv2/elJn2TVLgn3dMYmw1FhmM88smSwWyQgtke4qAIyMgg9eNLEm+/5+t42jT6G9T3kOqeUPsytlxptP8AUPooICVYUMKOEq4j56LHt5eP007W0OVcdeFQr0wK4tOt0NL7kVxIUDyCVqRnsZ74HHxqXbl/Uureu0Z7UO2IVJdt5yP6k4oQl2dTnXA0FSWgfTBS76eeJxh3HxnSJaO3t4zqlVYNJtC5GaxRoa5L8dqIpLEdZQpKnlLWcJCkqIHlJ8Y0qUyhyLZrbFBq1bqUZpwKU24ywJCeaR+k8AVZ8pJwcefGrLt99SdgW7b8y37xqT9Sp8UpXCTDpYfWEklS2iXVJHZAHIDoZz4Gse2N103d7cKVcNCs9VM9GUVSqlKy7Bp9NSnkgurWcety6CU8UnOegMaed6boqcZ/1rLftupMLcMZL7czi8pzAKioOoAIBBHSujjB8jUtlNVim15Mtd9xWo6WUffzqbTVrbjSVDP2oABMh8j4BGAOyCdCYe/lWtKtSZ+2cWq0GsNe1pHpcXnV59zxbCQ2yCAnKMKOc5URjSzufct8XCwx/P24EqZV5b6JLcdTxdZbGCFOKXy4pUMeCCfI6Gs1obY0GE9Kn7r1SqGIuMJseBTQ07LmJCPULi1KWA02EkqGclWfGm035t7FtelzqRbsyn0SbM+3RBlvMLEtDSzyyhJDiuyj3ABIUfJx0Hub6jBbNXlI2xtyDQmJMX0W+BUp6KshSFp5EkKBSo/A7I7ONbG3H1d1u1abV49wUBy4qnVktQxmT6DKoobcQoPBIJdXhaQMBI6yoq6Gn/aNjbyJatXuzeKjS3mopP24lplS3ogdTkqbQMobUrIKVKPI/toBvnf+1t2RrTRZNvVmm0qkx/tYQW4S1UEqwpR4hJSh8K/VkkkY66GnCxLatibUGKfTalHpT8uOHILE1aXyuUU9IUCeKeR5HIxjHx419WNmfqZH8SnsbcwXKdEaUfWgrQkckklfpj9eSB5AI7PnOdSRy597q3S3qNETUGaathEl8tNL9aGhSyj+oUjKScFRSeykg9HTfZWyFDqt2RKLWESolObhtN1Bp5sfcrlpHM+mpSScLyO0kY8YOdWtFhUe3mJMuFaaIjUgIBUqC47ISRgArKgcADOCnx0T+3O1B3BkUSg3DuQ3csc3hM5sMw2JCPbzVyXJUgdpSgBKQPnxkjUtbn1yovSq9XpEmeG0GS6la/J5gkAHo8lHHQPtz511Xt/a8aNaIum3ZKKY+6GnE0aU23MhLc444DkpJZKuWPaSB/wnXq5b+uHb2kzLlte06Ii41upaZdTALraEq4pUU9J9oyewFePnzrmLcG4N8LyuKRb91RauqREHrLpUWItqO02ASHUsoASEcSSFYxg5z3pVptGqNRqr8CiR1uNKSVSUKcXw4tjmr1Ox0OJ6PyOu8a652Ys6sP02iHdzehNp0SnweNNlipttzksFwH0GgVZPu5An/COeCNaG9+wW1pnprOw+91NlOVWalhqD6qvV9UknDklSgMAjpasDojKjgakt2bLvUCkmfd1yworTCC39xLq8V9xb/IlwNsR1LcUgkKAJIPIEYwM6FXjudVLkt2Jtnt5IqFPs+mNNiQuQ6GX6o40B/WkYVjAPaGgogEjycYIM1+hUWHTaJOrNUiuIQhKlxHgHC1yPIuOq8KUMYSjCU5PIk96MXvVoF3UF2l2fWvtkIaUBESsIbKy4eLaeGQoBCVpUehkAqKsnKBcG2l80CkJuurhthEri6kpeCn+0JUlSkA5SlQwcnzjP76QV1CU856sl0vFPZKjy5An5/wBTonOuadX3Y6Km6XExUBhpXLAQjPWc58fvnzr1XqzTKky2Ke0qGiG4puNFU4XQhogdhfFOexnwD3nQRmQlscnYqHT3hSyr/sfjXVX0W7e2jes9UivRo8pMB4zpbU2MkoLDQBIZPLK1YKirwlIAznOCU3w3H3I3QrbtibciHSLWYqLsiOzAdQtM9aFKKZAKUBZJA9qM8RgAeM653gUbcW9aq1alMp86qVN6QWY0BEYoWlxRJ6SAAlRJ6GR2rrzroRj6Ud49v6BBkbm3XS7edmPsmJRZdRaDxd88XOxxASnvCiE4Ocaa6JvncGw9SYatm7IG5M0x1QUQmFuLiQeTqQsLlr4IUoLU2ElIUM5TnBB1Oq9flQqW5cq7glhap8d1ytU12W8GGZJIbdSsxyOZKgASAT11jGddE3Fuv9Odh2dRrmt/dS5v5jqCGEtJpgT6DTgSlLqnGlgOFKQkowpWT8E40hbn/X/Mq9yml7cxVMQYkZUfhUkApmPKGAopJ9gQO8AjJOuM4wXBWmYYyHkoILzKiDlIOSRno4wMZzgjsHTlVbvpj9QjxaLTWEw4UCOxxfWFOLSEJBDhACFk5HgDsnGDp+tDeO3Lfp0aiTKFKTCfJYmNsTFKPDOUlLbgKQrvPn56Ixp5v69rFsmLChuTJNRmPBLTzbjnNcRs5UELCiRzGRnHQ7x46Q90d+LoZo67es275L0SoLP3jbjSkPMD0fT9EK5FK46kK5JBzhfLHgaj9MSmapmZDmNqnqWPY4xlCitfnHYITnPj/LrWzXYm4z1Oi1+4may5SKqp0Myn2Vtx3VN+1YScBPXQOP8AtrMb33NlxWqaLpqa24qC0wkPqWpKFjh7fnBT7R+3Q0Gfte5GJkWmVum1CC8+lLzSZkdxBU2sZDoSoZKSO8gdjW1UI79KENimtn7l8ZjtoSvmOR68jtRxnI/IHWNGZthv0KUmFJntS2wpCvWjuNqZ5qT7gDkjo+05+UnI0ozX2olQKmXUqTHIdcHPteSAW+gMeSCP76yXLf1y3e+87XKi44h4hXooPFAA/SkfPEAAAfgD8DS8Egg4/wCp1+YP+HJz+2tpmnvyGkvNtry44GmyUnitZ/whXjOO+zrfotInOVtFIUhhl1byoyvulJShK+wQpROE/wB8/jXW+yVhUOg2/Nq1Wn3OHWn3I0NNNcwwypxKQ+AlrklzmgJTjPYI/BGqE7dX0q21W45uCyqrbU9bLbKKIxBW28+tQGF8DhLRKgkqJABCsgDJGn+qbmQRbVQ3Bi3DT6bT2YrEeqRGFKEqlKHEFAURkOA45LSk9ccHGdcXUmj1r6gN2P5NtOvT58y45iF/dSeSvQYIJcKie8JOeh1gnQfdLaqo7Y1uqWLcFYYU9QFMqeVGlpkpejOOgLU2E49ySUqU2rvvPWM6x7Tbd1nca6qtQLSrUQxobby2ZktRYL7YPFKeAII5ZBIJ9ugVctip0q8mKXclQYjMMyfQMp5h1DDKEultZUOHIBHE5wnP471qXlaTFnVpUGNVoFUadjNymZEXl6S0ujKchWClWDlSTniTjJxpksm1KDPuqn0m67eqVVgVEqiN/ZVFLDrHNQbRI9QpLZ4LUlRQeikkEjIIpVo/QnuvWGp86pqiUOlMPNtsz6pOYZbeGVAlASpaVKAxkchjkMZyNTG/9v4dnVefSHLqoj06nS1wn6a+66JSVIICieLYb9P5GV8v28jWChWeiuxDMYkCW500yiVUmeKH1H+mAgKytCzxTkkYx2CD17r9qVCnR/4vDZp9KeXLPpsCoIUlD6MhQYbUsuKSf0jlyTlJwog68wtv74gwVXfbtKcbV6ohtsoCVyFlY/3zaATgfhQPtyMedP1PuW/KlZ9RsTcVysTYC4rDFPal0QyUxHUurIaaWlxCAo4Cg5nJJIOT1oZQNpZynnZdNfLkyA6ktpYZC1kthCuSck5ThQCgccScYPet/dG9p16S/tptrUppcBpMT7713Hi04ge9aF5SkoIAyCV4OAMeNBNmtvHNwq36qLiodstJZeZTIrFQbjoeDieKg3k8jhKgTkDGcg/Gt3cjay8dvJQg15uFU2OZbRNgPFbCjwTnB9vE4PL3jOBnPkaG7a7TP7lyZtMhSLaaqEthTkVE6cFuOcCkqDXAkheOgCDkZ6xrqyg/Tvs7Rtu5lDr+2cGmXZKjJivy3Ky3JZkJaAKnIwUAUrWSkkLCOzgEADULg7H0GkVGtWNTrciXLcj/AAeYkLbW59slILqkoYbURxUj5V44nGTjXunbRbWUu7403crb+uW/TIkJmcqLFk82X0LSOReU8QsAEk4bz0QPPZbvqTsjZil29cdUp6kw4r32cy2olPVhHF5A5qUhOULKiBhZV0jro4zyXSXpUqYwqPDWtwBDLLaFnCjnGR/wjz+2u0bPq10Q9rWaVEhv1GpmjvKj0mOx6gdkuLSEvLdR2VNAICgk/wCJP5OufaTtbcT9ahPXfNqbM9icUz/WhSX3strAUkLAVy4gfOD2ANPe9NMFg3PBm0uhu/w2rxnVRZzLI+3mOqdX6wUVEhaOBKVJGClXRGPJb6UbfgQJdUpzltwZL9ZjFMyovSHYz0KnqCkkRT1hSiR7wCrAOAQDqa0yqObX7zVqgU/LVFelSINSEplE5/7AqypKuSSS4E8ckALB66ORopLqMKM7VqnTXaxGrsNwt0mnOwmksPU1SQCoqbCQl1AJd5k8RxTn3DGi1zXdWNzahMlWbSq5cFDtmIGzU36QwuUeYCnHJC0JJWvmT3kq4gq6OdJ1xQdpLrt6JWKTWLlpVUc4x5ceWlExpx1IQVPJICVJSpalf08kp9pJwTrFU9tN249Lp0BilhKW1Ox46I8ttC1KUtJUnhzClI7ThYTjIIz7dL9ZmbgN0ZMKpxayYcWS4VOPBYaKwQlfDOBjlwJA6BA0qyqyJrifum3HlAYWoKDZKR4HQ8jo5OckYOfOt+NUIbMNpb7MhwraWCWyEBRJA4hPH8dHH460Qo9fEZyQwXnGX3kp9VUlAW+9xUMIDqknhlKQPjCRj+9NoFuu1m14T6ITUgvuBuMovtxlMoS5z9JPYWlCgo4KsD9P41VKbtlb8egJrSLhrTFMipWmSUuqktpSlWVn+o3yOBn3IJGCSBrdp/1A7I2JVv5fuukSGYNRYC2qlTP/ABP3MYkpSp5KSlRyeZUnkf0+CTrn/eveSwazXITe0tDl06nRgozfXbQ23MdB9i0tgq4DHkf4uuhjUiiET5KUNMOuzZS8em22AFqKugnHYGP200zrflUZx6M3PbcaQ4QotOLClZAwrxxWQTgfvnx8r7bFYiS2XEqcYdbylt1aFN4V+cjsH5z/AK6tDG5E+VTqXRqbTazLfXD9NaajVG3yojPrNsFxPa1JJ4gkkBRwPGlmdvXctpXexclnUKFatTaKi6hpgFxKgcKBeP8AUUVJyFZPecaNXX9U+4m61Co9o16IiZJjBcMvstqLzsZakqW2ADxwOKuKSDx5dEcU4xbzXHS6ozHpVhw6nCtJBLFPbkvF7lxIyEKWVEgYAGFYyDjogDVsG5rJjMv2VdFNqUGmNyTIj1ahstqnrKkcUxnlrwC2VKBOCCOJGDnqg0fcvcHb+orNm3iw3/D0lsSHiYLnpuBKQPT9RZCgO+QIPyf2q0bemrOtQLlq9nP1F3+ItpUulxzKiOvuI5LeU4rCluggYx17fKuzrnTdvdF2+LyqVxXJT0R/WkPNNRmHFIWkhRPqjrilRVxycd8jxHWdELL3ot+3lRIdYstuUz6bYmLgzzHeeU3gNuBfYKwkDlywCRn86HMSrJuet3FN9d62DW1yW4rEoK9FiOvktWHED9SiEgJx2MjxnVb2vkVXay21S7dXb90UWTEdbkKccV9xT1PNDKgpvksoC0DkhKCfwCcak9Ouis7dXTUbrp1IWiDHky0P02Ip6PE+7W0WRI6PtaC3MpHgYSAMa1KXbdbrcaq1iz6JNlWszIU0w8thLzzjzTaV8CG8dHshfHGE5PY1hmt21TYjLUP712oSX1tr+37bhIz0VOkEqKsH2A4yCSQMDTttduUzbF806TuCy5XLemqVTKhHfbSQiIvALqCk5RwUAvknH6TjvW39Qf0zrsiWq59vaZMum0q9IblQ6vHUZSkNlSlBHJIxlXIJJVnOMjzjUnrW3l82K2JN22XWKYwUqcQmfCVltHLAKk8coTnI5kYJ6xo7b7iYMQVKt1CDHMziluMYanXSD3xUEpPAlPfE94IOnadutbdebbpEClNvNsghhmLT1h48h0vmU+45/sTg96tG2VyXexQ22J1NkQywn1G1PgkvBROfUSDySrrB6HWop9Su3sFuXGuWi+qp24ZX26qWG0yA3JUgnMcJAWnkpAPXyo8h8mB3TYlzWRUxTLutyq0WU4j1EMVGG4wtaAcckhYBIyD/AGxqp/TztJTNyadcbDNziDXWmkimR0SEIcyAVFwg4JHRTgY8k/AB2rm29vqyLwg2delIi0uRUwXGpKpZjx18cqCioFSFFST37UqHIZGil02NcEu3P41QS1CZaaSmSw06fVKxnkpLiSpK+yBkYz5+dRd2l1ee5JcMSa9KgxRKZcBAUlCVjKvyQcn9wQNbe4X3FSepNWWw0GpUQpDjSMBbgWoqKz3lZSUEj466xoxspt5clzVpdVpVpitQ6eT9whxh4tpHE+XEAJSRgdE957GOw1UmVMumq0vhaj1u0emIkDkhIMZQ4LKStRGcLUlQUP0gHIwNK9nNprE8xqY0ttKlqaCSA844Qk/1CpWQDgf4eOABpxZtCfMeaYkqLeHClpxSUujifniPH5/OdUimXZXNvaamjtopdSpQUiS5Tp8JaEOqBJCgleQcKAV0cZTnHnU+v61LQ3gkpqO3lDm0q+HGy/Pt9xHNmoYCiXoawcFXglHgjGMEEGGTY9wU1xTspiQylhz0/ULeEIWOvOMZ6x/loc4XXFF119a1ZJKiSSdMlmTL0t6QxcNtUuXJAdU2lxMVTralhPNST0Uq9oyUnPQyRquM73xVwlRK7t9SC6IDjQkQCv00iQnDiX4y/apHaVYRgtqSlSD8EhfFHcs+Ram5O2UpiZQazCjUt1DLjakxZjaOK28DsEkKWSpIIKik5BBM4uCLLorIhwp8iO62+oOpaA4JSv3pUk4BKSQME/g/OuhrCsmfux9Oki4JpacqVvz3/u2Xknm/zaX6MllZPtSoo4LT/u/aCMKChqebQ/UHvJZ130a1rYu2UxSVSfQjxZcZDzKgOlBKTj8fp5Zz3kHTR9Q1/wB07kJhvVGUlxFKpw9NuOy4ozVuq9uUE5BScHCicE4A8HSPtbQA5RpBuBMt2NUUIBgvqUz9y7kpOFqBHNIIKCe+YSPBOsNRtFuOht+0n5Lq3UK9VqQyGZbRQo8HEISSHUkY5BHYPJWBqrbZbj3xR6UiLfdryUU5UURm6y2pSih3sBT6TgjJKQVJ6GDk951G773Fuq1rxVSXZ0lf8szRPhPlSkyEvOM8UqCgcAJKyoEfJ89jAibvRulupKbo1zVVdeaHBqIy/HbffYwfaGSsKcJOO/cScnvvvftA3LtbdND3QanPNxHKg5T5JYCmnokgp7jPN4ykLQQoDGCAr5SRrsrdW0qF9RGw1OvOqNrlXJbXP15EJKDyWhvC8JGD5SlXHlgnsEpORzvs9RkUVmdRroqcunUqcn0vuKlJSqOta8goPhLZA94UCc9g/B1MaBU6A3c7lO/iC1Q0KfjqlxyXPYpw/wBbioZWkpwpRHYyTgeRSLp23akWfVYjNWhPVuPKhy4yJLjcZUZ5LYQ6lsKV7wsAEpAJ6BxjCjS7A3UqZsRzbeDZDlRnIYS3VnaK0hhl13BHBav1rUsL4qWBgJGR8nUrq9Sq1j1FMeNQWG10yUp1yC5UnZsRC0pUkh1DiQlagVYyPbjkCFA9EWIW2O5kNIuuLJ21uiIP6NVt+An7KUlWeCXY7ZT7hnjyR7gB2FfAG79ut29q7dVcD7rV42zIWhUSuUWQt+I42RghakgKaWn25Q4lKuzoLSai9WmIbtPlCYZGebSpB5hflTRQQVBQBA84V8DzozFopuRbDVJuOHTKmh1C4nqyEMOoWSkcgeigpHZPgjrzqs2lsrNjLUu7Zy1EyxKLryBOLhCiouFtPscbWocgfJSs4BOcLn1JfTBayaZBvjYpgTmwk/xqmwlOei2oJJ9SH6qQpbY4r5clFQ9vWopZELdmzqM7fNpCqxIUUupWpxtQbJICVn0zkHrAJI78djOtGp2veFRvKa9VqW/Sp819LpaSkNjm4gLJTywEjioKxkABQ+NVvbBiu2FR7otK6qey3GrMYPtOuttPeiE9lxLTmULAITlxCiUj46A0U3QsyFs/ftKauikrmWemJCp8yXEZJSpLaVZWkHkOPJRxxP6evg5tu0EGAqhrsqxK1QK7Y1dW/JePNDMpBWoEII8jBKyUnHZOAM6Utwdp9qbTp1aoFT3LjU+FLdJacfeS7JYI7ykJCiMKSAk4GehpOoLsmmuNxbX3VtS4YoWMxqrbUqAHE5/UqSy0V8ycEqPt/bHQr9u7ZVm4Y0mdWrapDxIK236XNVJaKVAlSVHIWpHY/UlJ70JOytSqbK3GrfdpjCzzSmbUD6JHjw4nkknz4J/f51Lqxfe4W0dbbpF4bZRURsqQFGUHmZTfgckIUpKsjyM5+QD407bvUfaW4aHbldtuzoE41ugOBcsKUVQnkOhPoqWkhKuAWQAcHiQCMY1zTt7Hm7Ibg0q87voExVLS46IstLSVKBCSEPpQro8VcV4OOvB7GuoLH25ta9mn6zUK5EgUQ1Ripwfs/UcXN4J5IU42rLaDjklYHkH4BGqvFv8ApDQm0O24LlNoslvElTQQy24Fe3mATyGRntI851CK5Y1GqDkW23YlPqTk6SspL6nZDyleUBKHVFLagCo+1PYGB1nWqnYS24ldiVS4lPUyoR3Q620otE8kuewcOCegOiB2ej2MjRTfvahuootmda9QdjVGfFdiylMNqPNSSVNpJCR6YSn2ZJBCcDwM6R9hqhE+nyrT5259Hq0GXJSUR3xTnZRKEjJCVhfpKSr9skfnTldu0Fy3tuLUa1BrEmLAfmYYC+SXuDgK0qaSonkMEHmOsnHjvSTc20+4G2kAxqjSJMxiQeLKHmshZBJJICuSuuyQesg6DWTv3unsTUWv4OiDUreqyUuVOhvkuw5AOULbXyzwcwCQeykEZGDjVTvnaizL1XR92rB2+dqtBueKsKVE5NrhPhf+5cbBCuSMFBcHI+0HBBB0gWzsxU5G5dQpjtGjuRIqG3I8d98NOyAoclOO9clkDnxHQ66/On7ca1XrenJTRY1UfpyG0qb+xa5LhE9lHp94A4g9gZ7+POztbu9drkaVbs+p/eMKcS/HdqUYIcCVkp4EJHHPg/4TgH9taN17m7vbcrYZbi06tQWnAEpnUxLjK/cD6aiP6gVjODnP9/GvO8iIu5tui9LMqr4hQYocchTXubqVFI9UlfZXwUCAVHOCM+ManW3MK1KtVk0Wr1eoUN+bHWzTahUnPXiCSrA9J1Qx/QUApGAcJKgo5IOrAzbFYsu1jU29zIFTt1kJbco1SiOTGVMHyAAVDzjPjGlFFP2Gr9NTUVTHLL+/WqM/UKBNdQ0y7n2pfbXnik5BCknGDgkaaLd+k/aOo0Ko3Ad61XQUsfbIzJSAEKGeOUArIJScrHjGmvb+LsvtuutG1byhzURoHrPx2ZjkmVGdax0XSCjCshKUqKSSoj8YUGPq3tZiqYbVJ/jL0h5h+L9i9ybUk4AKm85z+nAT1jONFq3v/diY7r1Zo1GpkAsrcH8be4ZUVDg4I6SVcBjycK78DvSDSrpqu61WWJW4NvtRWng2mnogNiK4jyAkvJPPPkkq/wDIP1P2cpNlvxa5D3SapMdCUSJkNTwQH0pWFKQoE8VjAABP56x8pG5NZ29u64Zq7oRTYcOpMr/hxpdYRIbcWkjC1eiVekkgDKCB8D99Me3F82NT7aG3twNw4NPTDREkll9a1OKSMB1pxA/GPaTkeM+QXn+advqJLaRb1+pqU5EMrLMaK26htCUgc3lrKQ2cY/V2fwdBFVtugTnafuhaDf2jsn+IUi6qWkFtAWkFJKh7ScY/IBA6Ond++vp/nWjCgXFesWuvwS3h9SEGYkJGelggBR6zn40oS999rHLujfwiw6lKSnDLspFRI4o7yrpPBWBgnJ851X7co21e6VqyY38NmGmrcUZSZkcNqawM80LRnvJHuHfRGgu7dly7Po9sVGyqlIntU1wpQ3HDj0hDISUj+oUnwT0D+T+NNlY20O91Np7kqrOJiSW28Boeg4Ucc+0H8kfqOPHY/Clc/wBAloTR6lPuGenk3gqlzWsIWOhy/ppKv/y/bVC2U2PtvY+yl29c9/mpNvPreaK1JbZY67Q2CcYA8n89/wB0u/lbcm7GG7VnomVlqKtLUtKpKkNNZyApbSeJGRkZJ8EDzqf0awNza7eiLtauductKksvsSSG4K2eI4qR7U5JGCpWQeWOvJ1pVaoSaNcMipVHbPkp55ceNFDiOnE5AWOZCVKJAxhQHuB786J20L53DpD9Br+3LdFiNyElmU7UYTrjiErzwdbUvJODgFAAGfGRnQHeDbubY1Ip1MYcolJoDr0l5bUZkVKWt14p5lQKgjlhCQlGQkYHydS6ZYAluxqZc88tR5DAehTWktBLTOSAlzjksqz5QlIxnsHo6E3D9MG9sNk0xdCcrxUPY9HmEpAPyEqAI1ntf6dLlr64tlXTYlWo0MhSXZblOcfVFkhHsfyh5ALKz7V8QpSQAoJPgONmfQTUaPcKqlcW68WlUCMpWV08vRnnVDjjClnHAcjnJCiBgYzkOtn/AEMW1T6RM+9tm4bnkS5y3f4xR6yIbT8RLvNCS2QQlBCUlSVBRBAIUMAlb3foWz1q3ZMqVZ2Fuy1ak6tav5jRX3I0L1SMlQWhpRVke0lvIyT++o5RLP8ApjqlZqL1fuCtBlxoGAaK5JqsgPK/5oMdKeu8e4Zx402U20Np7VLbNFrl6U2CGXHlTbgoiYodJSkIQlkcjgK5KKiPfkDrHanftt0eQ4ze1Evmo1unQHWmUJqiEtIDpz2kAJ/ppV2MpGPz2BpSm0udDor9zv3DRlNRXW2kQ4shv7mSc/rK0knH57z141nl1yyb5h0dhNcTbVdWhcaaX0/+rg2nJbX6iAVJWfBBTgdZPzpz2p+nG4LqqEd96+mDBW2Tmk/cSjjBxyWhBQBn4wfx++uwto/pKlUuKwy/f9QFHZPNuGyHiHlHBUXA6lIwTnCeOADqvw/pY2XRL++k2FRJclQBUpyCjBI+cAADThJ2otORHbhOU2CzFa48GExEJQnHQxgazUrai1qe4pVMVAiFauRAQMZ0ad2mo1TQROrsJaSkgtqWEpI/tjWB7ZqfBjFi0KvFiKSjggsFCuKfgBPjHzjS7QNiNxIeDdW4FUr7KFlQamoZQgHPnCQOWBgDPgDrHeWxG18FTPpT5yEpH/syoY/0GtJrbXb+jOrdZSwytf61oYPf+Y1+qsjbt1HpO1OQEqJVwbWcZPzgj+2h07bbblIT6Lz7yUjiklQBT+3Qzj9taX/oysIIU6oEIAyeS1Yx++BqI7+wbPpTEa3bPolDqNellRbYksuNMlsDJDi0lIUnOMgnI6VjrXFd7bNbuSdwEQqXajdFiVBtIS9To0oU1KwPcAtQPu6ySCQcgAnxr+nsn6O9iqgt31aDUkOuqKlPpq0j1c/sorJA/YdaDSvoD2QebKEV3cNnkMcm7vmZSP2BUR/01qOfQFsQ8hH8QqF9zg0OKRJuyYoY/sFgays/QV9PaE8WI13sp84au2ooH+gd1qzP9n39L0lSVVOzqvUy2cp+/uKfIAP5wt4jR21PpT2NsF8Lsy05NIWCCVRqtMSFEeCpJd4q/wAxotX/AKf9sLkkIkV+hmoOIOUmQ5zwf7EY0uT/AKPtgqk467NswOB5PFxtL6kNrH4KE4T/ANNDZX0S/TpPYENiyl04Ng8FwZjjKkj5AwcAH567+dLsn6GPp+hvN1GHRKgzKbSWy6iWAVg/kccf6AaYmdhrPpDDDlNqNaYDbXppSmSg4BOSclBV/wBca2FO1q1Q3Ep1yT3GkEhIkNsOED8ci3yP+Z16j7nXnGaWRVEuFJ65MIH/AOgNEafubdc9oCTJYVn8NAa+mXjWWkhSSxk//CGscbcG5EoIS+wAB/yU6zMX1cjnIqltePhhA/7a3IV1V6V/vp5P/wBtH/lopBqNQlEB6Ysg/ASkf9tHYFMYlBK5Djq8d4KgAf8AQaLs0GmAcvtxlXn99Z0W9Sk5KIwST5x869/wGAeglY/sdDKltpaFdaW1VKYh8O/rJCeR/wA8Z0rxvpa2XYLy4dsuRFOqK3FR5TjalknPZBye/jX/2Q=='
              />
            </pattern>
          </defs>
        </motion.svg>
      </motion.div>
      {/*  )} */}
    </AnimatePresence>
  );
};

export default Fullmoon;
