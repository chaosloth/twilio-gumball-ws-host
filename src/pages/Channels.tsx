import * as React from "react";

import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";
import { Text } from "@twilio-paste/core/text";
import { Flex, Box, Stack } from "@twilio-paste/core";

import { ProductMessagingIcon } from "@twilio-paste/icons/esm/ProductMessagingIcon";
import { SendIcon } from "@twilio-paste/icons/esm/SendIcon";
import { VoiceCapableIcon } from "@twilio-paste/icons/esm/VoiceCapableIcon";
import { ChatIcon } from "@twilio-paste/icons/esm/ChatIcon";

import UserContext from "../UserContext";

interface ChannelProps {
  verifyVia: (channelType: string, address: string, userId: string) => void;
}

export const Channels: React.FC<ChannelProps> = (props) => {
  const user = React.useContext(UserContext);

  const isCallEnabled = !user.phone || user.phone === "" ? true : false;
  const isEmailEnabled = !user.email || user.email === "" ? true : false;

  const obscureEmail = (email: string) => {
    if (!email || email.length === 0) return "";
    const [name, domain] = email.split("@");
    return `${name[0]}${new Array(name.length).join("*")}@${domain}`;
  };

  const obscurePhone = (phone: string) => {
    if (!phone || phone.length === 0) return "";
    const startDigits = phone.slice(0, 4);
    const endDigits = phone.slice(-3);
    return `${startDigits}${new Array(phone.length - (4 + 3)).join(
      "*"
    )}${endDigits}`;
  };

  const email = obscureEmail(user.email);
  const phone = obscurePhone(user.phone);

  return (
    <Flex padding="space80" hAlignContent="center" height="100vh" grow>
      <Text as="div" textAlign="center">
        <img alt="candy" src="candy.png" className="candy" />
        <Heading as="h2" variant="heading10">
          Ahoy, {user.name}!
        </Heading>
        <Heading as="h3" variant="heading10">
          How should we verify it's you?
        </Heading>

        <Box className="channelSelector" padding="space60">
          <Heading as="h3" variant="heading20">
            Pick a channel where you can receive a verfication code right now
          </Heading>
          <Flex vAlignContent="center" hAlignContent="center">
            <div style={{ width: "100%" }}>
              <Stack
                style={{ width: "100%" }}
                orientation={["vertical", "vertical", "horizontal"]}
                spacing="space80"
              >
                <Button
                  disabled={isCallEnabled}
                  variant="destructive_secondary"
                  fullWidth={true}
                  onClick={() =>
                    props.verifyVia("call", user.phone, user.userId)
                  }
                >
                  <VoiceCapableIcon
                    decorative={false}
                    title="Ring me"
                    size="sizeIcon110"
                  />
                  Call <br /> {phone}
                </Button>
                <Button
                  disabled={isCallEnabled}
                  fullWidth={true}
                  variant="destructive_secondary"
                  onClick={() =>
                    props.verifyVia("whatsapp", user.phone, user.userId)
                  }
                >
                  <ChatIcon
                    decorative={false}
                    title="Shoot me a whatsapp message"
                    size="sizeIcon110"
                  />
                  WhatsApp <br />
                  {phone}
                </Button>
                <Button
                  disabled={isCallEnabled}
                  variant="destructive_secondary"
                  fullWidth={true}
                  onClick={() =>
                    props.verifyVia("sms", user.phone, user.userId)
                  }
                >
                  <ProductMessagingIcon
                    decorative={false}
                    title="Shoot me a text"
                    size="sizeIcon110"
                  />
                  SMS <br />
                  {phone}
                </Button>
                <Button
                  disabled={isEmailEnabled}
                  variant="destructive_secondary"
                  fullWidth={true}
                  onClick={() =>
                    props.verifyVia("email", user.email, user.userId)
                  }
                >
                  <SendIcon
                    decorative={false}
                    title="Shoot me an email"
                    size="sizeIcon110"
                  />
                  Email <br /> {email}
                </Button>
              </Stack>
            </div>
          </Flex>
        </Box>
      </Text>
    </Flex>
  );
};
