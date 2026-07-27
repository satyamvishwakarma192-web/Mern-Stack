import { Link } from 'react-router-dom';

const AuthPage = ({
  title,
  subtitle,
  roleLabel,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkTo,
  extraFields = []
}) => {
  return (
    <div className="auth-shell">
      <div className="auth-orb auth-orb--one" />
      <div className="auth-orb auth-orb--two" />

      <div className="auth-card">
        <div className="auth-card__header">
          <div className="brand-mark">🍽️</div>
          <span className="eyebrow">Fresh food access</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="auth-card__body">
          <div className="role-pill">{roleLabel}</div>

          <form className="auth-form">
            {extraFields.map((field) => (
              <label key={field.label}>
                <span>{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea placeholder={field.placeholder} />
                ) : (
                  <input type={field.type || 'text'} placeholder={field.placeholder} />
                )}
              </label>
            ))}

            <label>
              <span>Email</span>
              <input type="email" placeholder="name@example.com" />
            </label>

            <label>
              <span>Password</span>
              <input type="password" placeholder="Enter password" />
            </label>

            <button type="button">{buttonText}</button>
          </form>

          <p className="auth-footer">
            {footerText}{' '}
            <Link to={footerLinkTo}>{footerLinkText}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
