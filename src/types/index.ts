export interface CardTemplate {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface GreetingCard {
  templateId: number;
  message: string;
  image: string | null;
  createdAt: Date;
}

export interface LoveReason {
  id: number;
  content: string;
  createdAt: Date;
}
