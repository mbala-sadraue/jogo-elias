import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Smartphone, Server, Cpu } from 'lucide-react';
import useCapacitor from '@/hooks/use-capacitor';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DeviceInfoProps {
  onClose?: () => void;
}

export default function DeviceInfo({ onClose }: DeviceInfoProps) {
  const { isNative, isAndroid, isIOS, platform } = useCapacitor();

  const deviceOS = isAndroid 
    ? 'Android' 
    : isIOS 
      ? 'iOS' 
      : 'Browser';

  const getPlatformIcon = () => {
    if (isAndroid) return <Smartphone className="h-5 w-5 text-green-500" />;
    if (isIOS) return <Smartphone className="h-5 w-5 text-blue-500" />;
    return <Server className="h-5 w-5 text-gray-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Device Information
          </CardTitle>
          <CardDescription>
            Details about your current device and platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Platform</span>
              <span className="flex items-center gap-2 text-sm">
                {getPlatformIcon()}
                {deviceOS}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Environment</span>
              <span className="text-sm">
                {isNative ? 'Native Application' : 'Web Browser'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Technical Platform</span>
              <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                {platform}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            <Settings className="mr-2 h-4 w-4" />
            Close
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}