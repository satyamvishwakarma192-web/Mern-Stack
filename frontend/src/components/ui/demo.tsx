import { WelcomeScreen } from '@/components/ui/onboarding-welcome-screen';

const WelcomeScreenDemo = () => {
  const handleGetStarted = () => {
    alert('Get Started button clicked!');
  };

  const handleLogin = () => {
    alert('Login link clicked!');
  };

  return (
    <div className="relative mx-auto my-12 h-[812px] w-[975px] max-w-sm overflow-hidden rounded-3xl border shadow-lg">
      <WelcomeScreen
        imageUrl="https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title={
          <>
            Welcome To <span className="text-primary">Doorin</span>
          </>
        }
        description="Discover and book hotels effortlessly with Doorin, your personalized hotel booking app."
        buttonText="Let's get started"
        onButtonClick={handleGetStarted}
        secondaryActionText={
          <>
            Already have an account? <span className="font-semibold text-primary">Login Now</span>
          </>
        }
        onSecondaryActionClick={handleLogin}
      />
    </div>
  );
};

export default WelcomeScreenDemo;
