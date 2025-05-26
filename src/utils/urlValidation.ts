
export interface ValidationResult {
  isValid: boolean;
  platform: 'youtube' | 'facebook' | 'instagram' | 'unknown';
  error?: string;
}

export const validateVideoUrl = (url: string): ValidationResult => {
  if (!url.trim()) {
    return {
      isValid: false,
      platform: 'unknown',
      error: 'Please enter a URL'
    };
  }

  // YouTube validation
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/;
  if (youtubeRegex.test(url)) {
    return {
      isValid: true,
      platform: 'youtube'
    };
  }

  // Facebook validation
  const facebookRegex = /^(https?:\/\/)?(www\.)?(facebook\.com\/(watch\?v=|.*\/videos\/)|fb\.watch\/)[\w-]+/;
  if (facebookRegex.test(url)) {
    return {
      isValid: true,
      platform: 'facebook'
    };
  }

  // Instagram validation
  const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p\/|reel\/|tv\/)[\w-]+/;
  if (instagramRegex.test(url)) {
    return {
      isValid: true,
      platform: 'instagram'
    };
  }

  return {
    isValid: false,
    platform: 'unknown',
    error: 'Please enter a valid YouTube, Facebook, or Instagram URL'
  };
};

export const extractVideoId = (url: string, platform: string): string | null => {
  switch (platform) {
    case 'youtube':
      const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return youtubeMatch ? youtubeMatch[1] : null;
    
    case 'facebook':
      const facebookMatch = url.match(/facebook\.com\/.*\/videos\/(\d+)|fb\.watch\/([^/?]+)/);
      return facebookMatch ? (facebookMatch[1] || facebookMatch[2]) : null;
    
    case 'instagram':
      const instagramMatch = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?]+)/);
      return instagramMatch ? instagramMatch[1] : null;
    
    default:
      return null;
  }
};
