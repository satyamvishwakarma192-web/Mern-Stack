import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.css';
import './AuthPageMobile.css';

const AuthPage = ({
  title,
  subtitle,
  roleLabel,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkTo,
  fields = [],
  onSubmit
}) => {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.initialValue ?? '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedbackMessage('');
    setFeedbackType('');

    if (!onSubmit) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(formData);
      const message = typeof result === 'string' ? result : result?.message || 'Request completed';
      setFeedbackMessage(message);
      setFeedbackType(result?.success === false ? 'error' : 'success');
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Something went wrong';
      setFeedbackMessage(message);
      setFeedbackType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form className="auth-form" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <label key={field.name}>
                <span>{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                  />
                )}
              </label>
            ))}

            {feedbackMessage ? (
              <p className={`auth-feedback auth-feedback--${feedbackType}`}>{feedbackMessage}</p>
            ) : null}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : buttonText}
            </button>
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
