import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import styled from "styled-components";
const Landing = () => {
  return (
    <StyledWrapper>
      <nav>
        <img src={logo} alt="PM" className="logo" />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Real Estate Project <span>Management</span> App
          </h1>
          <p>
            Add and manage properties with ease — whether they’re
            <strong>for rent</strong>,<strong>for sale</strong>,
            <strong>occupied</strong>, or <strong>under maintenance</strong>.
            Track property statuses in real time, monitor availability, and view
            insightful statistics with monthly graphs — all in one powerful
            dashboard.
          </p>

          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </StyledWrapper>
  );
};

// const StyledWrapper = styled.section`
//   nav {
//     width: var(--fluid-width);
//     max-width: var(--max-width);
//     margin: 0 auto;
//     height: var(--nav-height);
//     display: flex;
//     align-items: center;
//   }
//   .page {
//     min-height: calc(100vh - var(--nav-height));
//     display: grid;
//     align-items: center;
//     margin-top: -3rem;
//   }
//   h1 {
//     font-weight: 700;
//     span {
//       color: var(--primary-500);
//     }
//     margin-bottom: 1.5rem;
//   }
//   p {
//     line-height: 2;
//     color: var(--text-secondary-color);
//     margin-bottom: 1.5rem;
//     max-width: 35em;
//   }
//   .register-link {
//     margin-right: 1rem;
//   }
//   .main-img {
//     display: none;
//   }
//   .btn {
//     padding: 0.75rem 1rem;
//   }
//   @media (min-width: 992px) {
//     .page {
//       grid-template-columns: 1fr 400px;
//       column-gap: 3rem;
//     }
//     .main-img {
//       display: block;
//     }
//   }
// `;

const StyledWrapper = styled.section`
  background: linear-gradient(135deg, #f9fdfb, #e6f7f1);
  position: relative; /* so ::before can attach */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* 🔥 Watermark Background */
  &::before {
    content: "EkoEstate EkoEstate EkoEstate EkoEstate EkoEstate EkoEstate ";
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

  nav {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    padding: 0 2rem;
  }

  .page {
    position: relative;
    z-index: 1;
    flex: 1;
    display: grid;
    align-items: center;
    margin: 0 auto;
    padding: 2rem;
    max-width: 1200px;
    gap: 3rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;

    span {
      background: linear-gradient(90deg, #00c853, #009688);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    line-height: 1.8;
    color: var(--text-secondary-color);
    margin-bottom: 2rem;
    max-width: 35em;
    font-size: 1.1rem;
  }

  .btn {
    padding: 0.9rem 1.4rem;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .register-link {
    margin-right: 1rem;
    background: linear-gradient(90deg, #00c853, #009688);
    color: #fff;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 200, 83, 0.3);
    }
  }

  .btn:not(.register-link) {
    background: #fff;
    border: 2px solid #00c853;
    color: #00c853;

    &:hover {
      background: #00c853;
      color: #fff;
    }
  }

  .main-img {
    width: 100%;
    max-width: 450px;
    animation: float 4s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (max-width: 992px) {
    .page {
      grid-template-columns: 1fr;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default Landing;
