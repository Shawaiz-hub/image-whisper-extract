
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { DownloadItem } from '@/hooks/useDownloadQueue';

interface DownloadProgressProps {
  item: DownloadItem;
  onRemove: (id: string) => void;
}

const DownloadProgress: React.FC<DownloadProgressProps> = ({ item, onRemove }) => {
  const getStatusIcon = () => {
    switch (item.status) {
      case 'pending':
        return <Download className="w-4 h-4 text-blue-500" />;
      case 'downloading':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  const getStatusText = () => {
    switch (item.status) {
      case 'pending':
        return 'Waiting...';
      case 'downloading':
        return `Downloading... ${item.progress}%`;
      case 'completed':
        return 'Download complete';
      case 'error':
        return item.error || 'Download failed';
      default:
        return 'Unknown status';
    }
  };

  const getProgressColor = () => {
    switch (item.status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium text-sm truncate max-w-[200px]">
              {item.title}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="h-6 w-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <Progress 
            value={item.progress} 
            className="h-2"
          />
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{getStatusText()}</span>
            <span className="truncate max-w-[150px]">{item.url}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadProgress;
