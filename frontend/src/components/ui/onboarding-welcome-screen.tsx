import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  imageUrl: string;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryActionText?: React.ReactNode;
  onSecondaryActionClick?: () => void;
  className?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  imageUrl,
  title,
  description,
  buttonText,
  onButtonClick,
  secondaryActionText,
  onSecondaryActionClick,
  className,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const imageVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
      },
    },
  };

  return (
    <div className={cn('flex h-full w-full flex-col items-center justify-between bg-background', className)}>
      <motion.div className="relative w-full" initial="hidden" animate="visible" variants={imageVariants}>
        <img src={imageUrl} alt="Welcome" className="h-auto w-full object-cover" style={{ clipPath: 'ellipse(100% 60% at 50% 40%)' }} />
      </motion.div>

      <motion.div
        className="flex flex-1 flex-col items-center justify-center space-y-6 p-8 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl" variants={itemVariants}>
          {title}
        </motion.h1>

        <motion.p className="max-w-md text-muted-foreground" variants={itemVariants}>
          {description}
        </motion.p>
      </motion.div>

      <motion.div className="w-full space-y-4 p-8 pt-0" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Button onClick={onButtonClick} className="w-full" size="lg">
            {buttonText}
          </Button>
        </motion.div>

        {secondaryActionText && onSecondaryActionClick && (
          <motion.div variants={itemVariants} className="text-center">
            <Button variant="link" onClick={onSecondaryActionClick} className="text-sm text-muted-foreground">
              {secondaryActionText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
