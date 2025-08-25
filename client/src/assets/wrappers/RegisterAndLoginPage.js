// import styled from 'styled-components';

// const Wrapper = styled.section`
//   min-height: 100vh;
//   display: grid;
//   align-items: center;
//   .logo {
//     display: block;
//     margin: 0 auto;
//     margin-bottom: 1.38rem;
//   }
//   .form {
//     max-width: 400px;
//     border-top: 5px solid var(--primary-500);
//   }
//   h4 {
//     text-align: center;
//     margin-bottom: 1.38rem;
//   }
//   p {
//     margin-top: 1rem;
//     text-align: center;
//     line-height: 1.5;
//   }
//   .btn {
//     margin-top: 1rem;
//   }
//   .member-btn {
//     color: var(--primary-500);
//     letter-spacing: var(--letter-spacing);
//     margin-left: 0.25rem;
//   }
// `;
// export default Wrapper;

import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f9fdfb, #e6f7f1);
  position: relative;
  overflow: hidden;

  /* 🔥 Watermark Background */
  &::before {
    content: "EkoEstate EkoEstate EkoEstate EkoEstate EkoEstate ";
    position: absolute;
    top: 0;
    left: 0;
    width: 300%;
    height: 300%;
    font-size: 5rem;
    font-weight: 800;
    color: rgba(0, 200, 83, 0.05); /* faint green */
    white-space: nowrap;
    line-height: 6rem;
    transform: rotate(-30deg);
    pointer-events: none;
    z-index: 0;
  }

  .form {
    width: 100%;
    max-width: 420px;
    background: #fff;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    position: relative;
    z-index: 1; /* ensure form sits above watermark */
  }

  .logo {
    display: block;
    margin: 0 auto 1.5rem auto;
    width: 70px;
    height: auto;
  }

  h4 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
    font-weight: 700;
    background: linear-gradient(90deg, #00c853, #009688);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.6;
    color: var(--text-secondary-color);
    font-size: 0.95rem;
  }

  .btn {
    margin-top: 1.5rem;
    padding: 0.9rem 1.2rem;
    border-radius: 8px;
    font-weight: 600;
    width: 100%;
    background: linear-gradient(90deg, #00c853, #009688);
    color: #fff;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0, 200, 83, 0.25);
    }
  }

  .member-btn {
    color: #009688;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-left: 0.25rem;
    transition: color 0.3s ease;

    &:hover {
      color: #00c853;
    }
  }
`;

export default Wrapper;
