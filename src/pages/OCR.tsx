import * as React from "react";
import { Card } from "@twilio-paste/core/card";
import { Button } from "@twilio-paste/core/button";
import { Text } from "@twilio-paste/core/text";
import { Flex, Stack, Alert } from "@twilio-paste/core";
import { useTheme } from "@twilio-paste/theme";
import { default as Handwriting } from "../HandwritingCanvas.js";
import { useNavigate } from "react-router-dom";
import { Heading } from "@twilio-paste/core/heading";

interface OCRProps {
  onVerification: (token: string) => void;
}

export const OCR: React.FC<OCRProps> = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [handwriting] = React.useState(new Handwriting());
  const [ocrResult, setOcrResult] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [haveCode, setHaveCode] = React.useState(false);

  // Set display size (vw/vh).
  const canvasWidth = (80 * window.innerWidth) / 100;
  const canvasHeight = (30 * window.innerHeight) / 100 || 766;

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
    borderRadius: "3%"
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
  }, [handwriting, theme.textColors.colorTextInverse]);

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
      <Flex padding="space200" hAlignContent="center" height="100vh" grow>
        <Stack orientation="vertical" spacing="space60">
        <img alt="candy" src="candy.png" className="candy"/>
            <Heading as="h3" variant="heading30">
                Using your finger, write the verification code you just received
            </Heading>
          <Flex vAlignContent="center" hAlignContent="center" >
            <div className="card">
              <Stack orientation="vertical" spacing="space60">
                <canvas
                  id="can"
                  width={canvasWidth}
                  height={canvasHeight}
                  style={canvasStyle}
                ></canvas>

                <Stack
                  orientation={["vertical",  "horizontal"]}
                  spacing="space80"
                >
                  
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
                    Clear Screen
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
                  {haveCode && (
                    <Text as="span">
                      I think you wrote <strong> {ocrResult}</strong>
                    </Text>
                  )}
                </Stack>
              </Stack>
            </div>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};
