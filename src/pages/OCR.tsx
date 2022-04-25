import * as React from "react";
import { Card } from "@twilio-paste/core/card";
import { Button } from "@twilio-paste/core/button";
import { Text } from "@twilio-paste/core/text";
import { Flex, Stack, Alert, Paragraph } from "@twilio-paste/core";
import { useTheme } from "@twilio-paste/theme";
import { default as Handwriting } from "../HandwritingCanvas.js";
import { useNavigate } from "react-router-dom";

interface OCRProps {
  onVerification: (token: string) => void;
}

export const OCR: React.FC<OCRProps> = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [handwriting, setHandwriting] = React.useState(new Handwriting());
  const [ocrResult, setOcrResult] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [haveCode, setHaveCode] = React.useState(false);

  // Set display size (vw/vh).
  const canvasWidth = (80 * window.innerWidth) / 100;
  const canvasHeight = (60 * window.innerHeight) / 100 || 766;

  const handleDoneClick = () => {
    if (!haveCode) {
      setIsProcessing(true);
      handwriting.recognize();
    } else {
      setIsProcessing(true);
      props.onVerification(ocrResult);
    }
  };

  const handleClear = () => {
    handwriting.erase();
    setIsProcessing(false);
    setHaveCode(false);
  };

  const canvasStyle = {
    cursor: "crosshair",
    backgroundColor: theme.backgroundColors.colorBackgroundInverse,
  };

  React.useEffect(() => {
    var el = document.getElementById("can");
    console.log("Canvas element", el);
    handwriting.Canvas(el, 3, theme.textColors.colorTextInverse);
    handwriting.setCallBack((data: any) => {
      console.log("Handwriting callback", data);
      if (data instanceof Array) {
        setOcrResult(data[0]);
        setIsProcessing(false);
        setHaveCode(true);
      }
    });
  }, []);

  const [counter, setCounter] = React.useState(30);

  React.useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (counter <= 0) return;
      setCounter(counter - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  return (
    <>
      <Flex vAlignContent="center" hAlignContent="center" height="100vh" grow>
        <Stack orientation="vertical" spacing="space60">
          <Alert variant="neutral">
            <Text as="span">
              <strong>
                Using your finger, write the verification code you just received
              </strong>
            </Text>
          </Alert>
          <Flex vAlignContent="center" hAlignContent="center">
            <Card padding="space70">
              <Stack orientation="vertical" spacing="space60">
                <canvas
                  id="can"
                  width={canvasWidth}
                  height={canvasHeight}
                  style={canvasStyle}
                ></canvas>

                <Stack
                  orientation={["vertical", "vertical", "horizontal"]}
                  spacing="space40"
                >
                  {haveCode && (
                    <Text as="span">
                      I think you wrote <strong> {ocrResult}</strong>
                    </Text>
                  )}
                  <Button
                    variant="primary"
                    fullWidth={true}
                    onClick={handleDoneClick}
                    loading={isProcessing}
                  >
                    {!haveCode && "Check my writing"}
                    {haveCode && "Yep that's right, verify me!"}
                  </Button>
                  <Button
                    variant="destructive_secondary"
                    fullWidth={true}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth={true}
                    disabled={counter > 0}
                    onClick={() => navigate("/channels")}
                  >
                    Request new code
                    {counter > 0 && " in " + counter}
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};
