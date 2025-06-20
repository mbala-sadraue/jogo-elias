import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useLanguage } from '../hooks/useLanguage';

interface AgeVerificationProps {
  onAccept: () => void;
}

export default function AgeVerification({ onAccept }: AgeVerificationProps) {
  const [accepted, setAccepted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useLanguage();
  
  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem('age-verified', 'true');
      setIsOpen(false);
      onAccept();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] glass-card text-white border-none">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent neon-text">
            {t('game.title')}
          </DialogTitle>
          <div className="w-full flex justify-center my-2">
            <div className="h-0.5 w-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>
          <DialogDescription className="text-gray-300 text-center">
            {t('setup.welcome')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-dark-900 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-white">{t('age.verification')}</h3>
            <p className="text-gray-300 text-sm">
              {t('age.description')}
            </p>
          </div>
          
          <div className="bg-dark-900 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-white">{t('terms.title')}</h3>
            <div className="text-gray-300 text-sm space-y-2 max-h-36 overflow-y-auto pr-2">
              <p>
                {t('terms.introduction')}
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>{t('terms.item1')}</li>
                <li>{t('terms.item2')}</li>
                <li>{t('terms.item3')}</li>
                <li>{t('terms.item4')}</li>
                <li>{t('terms.item5')}</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={accepted} 
              onCheckedChange={(value) => setAccepted(value === true)}
              className="data-[state=checked]:bg-primary"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-200"
            >
              {t('age.confirm')}
            </label>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleAccept}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold shiny-button"
            disabled={!accepted}
          >
            {t('terms.accept')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}