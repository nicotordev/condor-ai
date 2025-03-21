"use server";

import { auth } from "@/auth";
import conversationsConstants from "@/constants/conversations.constants";
import logger from "@/lib/consola/logger";
import { encryptData } from "@/lib/crypto";
import { createConversation } from "@/utils/conversations.utils";
import { redirect } from "next/navigation";

async function createConversationAction(formData: FormData) {
  const session = (await auth())!;
  const message = formData.get("message") as string;
  const modelId = formData.get("modelId") as string;
  let redirectTo = "";

  if (typeof message !== "string" || message.length === 0) {
    redirectTo = `/app?state=${encryptData({
      error: conversationsConstants.ERROR_MESSAGES_CODES.MESSAGE_IS_NOT_VALID,
    })}`;
  }

  if (typeof modelId !== "string" || modelId.length === 0) {
    redirectTo = `/app?state=${encryptData({
      error: conversationsConstants.ERROR_MESSAGES_CODES.MODEL_IS_NOT_VALID,
    })}`;
  }

  if (!session.user.id) {
    redirectTo = `/app?state=${encryptData({
      error: conversationsConstants.ERROR_MESSAGES_CODES.USER_NOT_AUTHORIZED,
    })}`;
  }

  try {
    const newConversation = await createConversation(
      message,
      modelId,
      session.user.id as string
    );

    if (newConversation.error) {
      redirectTo = `/app?state=${encryptData({
        error: newConversation.error,
      })}`;
    }

    redirectTo = `/app/${newConversation.id}`;
  } catch (err) {
    logger.error("[ACTIONS-CREATE-CONVERSATION]", err);
    redirectTo = `/app?state=${encryptData({
      error: conversationsConstants.ERROR_MESSAGES_CODES.INTERNAL_SERVER_ERROR,
    })}`;
  } finally {
    redirect(redirectTo);
  }
}

export { createConversationAction };
