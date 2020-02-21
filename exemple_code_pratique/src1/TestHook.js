import React, { useState, useRef, useEffect } from "react";

//exer1
/*const InputElement = () => {
  const [inputText, setInputText] = useState("");
  const [historyList, setHistoryList] = useState([]);

  return (
    <div>
      <input
        onChange={e => {
          setInputText(e.target.value);
          setHistoryList([...historyList, e.target.value]);
        }}
        placeholder="Enter some text"
      />
      <br />
      {inputText}
      <hr />

      <ul>
        {historyList.map(rec => {
          return <div>{rec}</div>;
        })}
      </ul>
    </div>
  );
};*/

//exer2
/*const ImageChangeOnMouseOver = () => {
  return (
    <div>
      <ImageToggleOnMouseOver
        primaryImg="http://stat.gouv.qc.ca/jeunesse/dossiers/developpement_durable/dev_durable01.jpg"
        secondaryImg="http://stat.gouv.qc.ca/jeunesse/dossiers/drogue/drogue01.jpg"
        alt=""
      />
      &nbsp;&nbsp;&nbsp;
      <ImageToggleOnMouseOver
        primaryImg="http://stat.gouv.qc.ca/jeunesse/dossiers/drogue/drogue01.jpg"
        secondaryImg="http://stat.gouv.qc.ca/jeunesse/dossiers/developpement_durable/dev_durable01.jpg"
        alt=""
      />
    </div>
  );
};

const ImageToggleOnMouseOver = ({ primaryImg, secondaryImg }) => {
  const imageRef = useRef(null);

  return (
    <img
      onMouseOver={() => {
        imageRef.current.src = secondaryImg;
      }}
      onMouseOut={() => {
        imageRef.current.src = primaryImg;
      }}
      src={primaryImg}
      alt=""
      ref={imageRef}
    />
  );
};*/

//exer3
/*const Syntax = () => {
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  useEffect(() => {
    console.log("in useEffect");
    return () => {
      console.log("in useEffect Cleanup");
    };
  }, [checkBoxValue]);

  return <div />;
};*/

//exer4
const ImageChangeOnScroll = () => {
  return (
    <div>
      {[1124, 187, 823, 1269, 1530].map(speakerId => {
        return (
          <div key={speakerId}>
            <ImageToggleOnScroll
              primaryImg="http://stat.gouv.qc.ca/jeunesse/dossiers/developpement_durable/dev_durable01.jpg"
              secondaryImg="http://stat.gouv.qc.ca/jeunesse/dossiers/drogue/drogue01.jpg"
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

const ImageToggleOnScroll = ({ primaryImg, secondaryImg }) => {
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    setInView(isInView());
    setIsLoading(false);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
    //génère erreur
    /*,
      [isLoading]*/
  });

  const [inView, setInView] = useState(false);

  const isInView = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  };

  const scrollHandler = () => {
    setInView(() => {
      return isInView();
    });
  };

  return isLoading ? null : (
    <img src={inView ? secondaryImg : primaryImg} alt="" ref={imageRef} />
  );
};

const TestHook = () => {
  //return <InputElement />;
  //return <ImageChangeOnMouseOver />;
  //return <Syntax />;
  return <ImageChangeOnScroll />;
};

export default TestHook;
