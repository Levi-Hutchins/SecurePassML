export type SummaryInfoProps = {
    password: string;
    strength: string;
    passwordLength: number;
    suggestions: string[];
    isGenerateLoading: boolean;
  };
  
  export type MetricsInfoProps = {
    passwordLength: number;
    password: string;
    passwordChars: number; 
    passwordComplexity: number; 
  };
  
  export type SecurityInfoProps = {
    inRockYou: string;
    inTenMill: string;
    isCheckLoading: boolean;
  };