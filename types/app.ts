import { AppSuggestionIcon, MessageSender } from "@prisma/client";
import { Session } from "next-auth";
import { ParamValue } from "next/dist/server/request/params";

type AppNewConversationState = {
  error: string;
};

type AppNewConversationProps = {
  state: AppNewConversationState;
  session: Session | null;
  suggestions: {
    label: string;
    icon: AppSuggestionIcon;
  }[];
};

type AppConversationMessageType = {
  id: string;
  content: string;
  sender: MessageSender;
  createdAt: string;
  updatedAt: string;
  isTyping?: boolean;
  isLoading?: boolean;
  markdown?: React.ReactNode;
};

type AppConversationType = {
  id: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  messages: AppConversationMessageType[];
};

type AppConversationProps = {
  conversation: AppConversationType;
  session: Session | null;
  suggestions: {
    label: string;
    icon: AppSuggestionIcon;
  }[];
};

type AppMessageProps = {
  message: AppConversationMessageType;
  session: Session | null;
  isLastIndex: boolean;
  isPending: boolean;
};

type AppConversationSkeletonBubble = {
  sender: "user" | "ia";
  lines: number;
  message?: string;
};

type AppConversationSkeletonProps = {
  bubblesParam?: AppConversationSkeletonBubble[];
};

type AppConversationItemNavProps = {
  id: ParamValue;
  conversation: {
    id: string;
    title: string;
  };
};

type AppAsistantMessageProps = {
  isLastIndex: boolean;
  isPending: boolean;
  content: string;
  markdown?: React.ReactNode;
};

type AppUserMessageProps = {
  content: string;
};

type AppChatFormProps = {
  isPending: boolean;
  message: string;
  isInitialChat?: boolean;
  suggestions: {
    label: string;
    icon: AppSuggestionIcon;
  }[];
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleQuery?: (message: string) => void;
};

type AppSuggestionBarProps = {
  handleQuery?: (message: string) => void;
  suggestions: {
    label: string;
    icon: AppSuggestionIcon;
  }[];
};

type AppConversationItemNavEditConversationNameProps = {
  conversationName: string;
  conversationId: string;
};

type AppNavUserConfigurationModalPropsTab =
  | "general"
  | "notifications"
  | "personalization"
  | "audio"
  | "data-control"
  | "constructor-profile"
  | "connected-apps"
  | "security"
  | "subscription";

type AppNavUserConfigurationModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type AppConversationState = {
  conversationId: string;
  message: string;
  modelId: string;
};

export type {
  AppConversationType,
  AppNewConversationProps,
  AppNewConversationState,
  AppConversationProps,
  AppConversationMessageType,
  AppMessageProps,
  AppConversationSkeletonProps,
  AppConversationSkeletonBubble,
  AppConversationItemNavProps,
  AppAsistantMessageProps,
  AppUserMessageProps,
  AppChatFormProps,
  AppSuggestionBarProps,
  AppConversationItemNavEditConversationNameProps,
  AppNavUserConfigurationModalProps,
  AppNavUserConfigurationModalPropsTab,
  AppConversationState,
};
