import "./style.css";
import "phaser";
import Flickity from "flickity";
import TWEEN from "@tweenjs/tween.js";
// import Game1 from "./classes/game1/Game.js";
// import Game2 from "./classes/game2/Game.js";

{
  let stories;
  let story;
  let dialogueCount = 0;
  let currentDialogue;
  const $answerbox = document.querySelector(`.answers`);
  const $chatbox = document.querySelector(`.messages`);

  const parseStory = data => {
    if (!$chatbox) {
      return;
    }
    story = data.scenarios.scenario_1;
    const $naam = document.querySelector(`.chat_head_name`);
    if ($naam) {
      $naam.innerHTML = story.ontvanger;
    }

    story.premise.forEach(premise => {
      setTimeout(() => {
        const $loader = messageLoading();
        $chatbox.appendChild($loader);
        setTimeout(() => {
          $chatbox.removeChild($loader);
          const $message = createMessage(premise);
          $chatbox.appendChild($message);
        }, 1000);
      }, premise.delay);
    });

    createAnswersAndResponses(story.dialogues);
    setHeightChat();
  };

  const messageLoading = () => {
    const $li = document.createElement(`li`);
    $li.classList.add("spinner");
    $li.innerHTML = `
      <div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div>
    `;
    return $li;
  };

  const parse = data => {
    stories = data.stories;
    stories.forEach(character => {
      createStory(character);
    });
  };

  const createIntro = () => {
    const $ul = document.querySelector(".message_intro");

    setTimeout(() => {
      const $li = document.createElement(`li`);
      $li.classList.add("spinner");
      $li.innerHTML = `
      <div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div>
    `;
      if ($ul) {
        $ul.appendChild($li);
      }
    }, 1000);

    setTimeout(() => {
      $ul.innerHTML = ``;
      const $li = document.createElement(`li`);
      $li.classList.add("dialoog");
      $li.classList.add("charactre");
      $li.innerHTML = `
        <div class="dialoog_message_character">
          <p>Yoo, what’s up? Chat met onze Belgische atleten en unlock de ultieme challenge!</p>
        </div>
    `;
      if ($ul) {
        $ul.appendChild($li);
      }
    }, 3000);

    setTimeout(() => {
      const $li = document.createElement(`li`);
      $li.classList.add("dialoog");
      $li.classList.add("other");
      $li.innerHTML = `
        <div class="dialoog_message_other">
          <p>Bring it on!</p>
        </div>
    `;
      if ($ul) {
        $ul.appendChild($li);
      }
    }, 5000);
  };

  const createStory = character => {
    const $ul = document.querySelector(`.stories`);
    const $li = document.createElement(`li`);

    $li.classList.add(`story`);
    $li.innerHTML = `
      <a href="index.php?page=${character.name.link}">
        <p class="story_duration">${character.storyduration} min</p>
        <div class="story_card">
          <img src="${character.picture.thumbnail}" alt="${character.name.voornaam} ${character.name.achternaam}" class="img_responsive story_img"/>
          <div class="meta">
            <h3 class="story_naam">${character.name.voornaam} ${character.name.achternaam}</h3>
            <p class="story_bijtext">${character.premise}</p>
          </div>
          <div class="extra_info">
            <div class="read_indicator"></div>
          </div>
        </div>
      </a>
    `;
    if ($ul) {
      $ul.appendChild($li);
    }
  };

  const createAnswersAndResponses = dialogues => {
    $answerbox.innerHTML = ``;
    currentDialogue = dialogues[dialogueCount];

    if (!currentDialogue) {
      return;
    }

    currentDialogue.choices.forEach(choice => {
      const $choice = createChoice(choice);
      $answerbox.appendChild($choice);
    });

    const elem = document.querySelector(".main-carousel");
    if (elem) {
      new Flickity(elem, {
        cellAlign: "left",
        draggable: true,
        prevNextButtons: false,
        pageDots: false
      });
    }

    const $btns = document.querySelectorAll(".dialoog_btn");
    $btns.forEach(btn => {
      btn.addEventListener("click", handleClickAnswer);
      setHeightChat();
    });
  };

  const handleClickAnswer = e => {
    e.currentTarget.style.backgroundColor = "#84ff00";
    e.currentTarget.style.color = "black";
    dialogueCount = e.currentTarget.dataset.id;
    const answer = e.currentTarget.innerHTML;
    setTimeout(() => {
      createAnswersAndResponses(story.dialogues);

      if (answer === "Continue") {
        return;
      } else {
        const $li = document.createElement(`li`);
        $li.innerHTML = `
              <div class="dialoog_message_other">
                <p>${answer}</p>
              </div>
            `;

        $li.classList.add("dialoog");
        $li.classList.add("other");
        $chatbox.appendChild($li);
      }

      if (!currentDialogue) {
        return;
      }

      currentDialogue.replies.forEach(reply => {
        const $reply = createMessage(reply);
        $chatbox.appendChild($reply);
      });
      setHeightChat();
    }, 500);
  };

  const createMessage = message => {
    const $li = document.createElement(`li`);
    switch (message.type) {
      case `message`:
        if (message.user === "character") {
          $li.innerHTML = `
            <div class="dialoog_avatar avatar_${message.user}">
              <img src="./assets/${message.character}.jpg" class="img_responsive">
            </div>
            <div class="dialoog_message_${message.user}">
              <p>${message.text}</p>
            </div>
          `;
          $li.classList.add("dialoog");
          $li.classList.add(message.user);
        } else {
          $li.innerHTML = `
            <div class="dialoog_message_${message.user}">
              <p>${message.text}</p>
            </div>
          `;
          $li.classList.add("dialoog");
          $li.classList.add(message.user);
        }
        return $li;
        break;
      case `image`:
        if (message.user === "character") {
          $li.innerHTML = `
          <div class="dialoog_avatar avatar_${message.user}">
            <img src="./assets/${message.character}.jpg" class="img_responsive">
          </div>
          <div class="dialoog_message is-image">
            <img src="${message.src}" class="img_responsive">
          </div>

          `;
          $li.classList.add("dialoog");
          $li.classList.add(message.user);
        } else {
          $li.innerHTML = `

          <div class="dialoog_message is-image">
            <img src="${message.src}" class="img_responsive">
          </div>

          `;
          $li.classList.add("dialoog");
          $li.classList.add(message.user);
        }
        return $li;
        break;
      case `link`:
        if (message.user === "character") {
          $li.innerHTML = `
          <div class="dialoog_avatar avatar_${message.user}">
            <img src="./assets/${message.character}.jpg" class="img_responsive">
          </div>
          <div class="dialoog_message_${message.user} is-link">
            <a href="${message.link}" target="_blank">${message.link}</a>
          </div>
          `;
          $li.classList.add("dialoog");
          $li.classList.add(message.user);
        } else {
          $li.innerHTML = `
          <div class="dialoog_message_${message.user} is-link">
            <a href="${message.link}" target="_blank">${message.link}</a>
          </div>
          `;
          $li.classList.add("dialoog");
          $li.classList.add(message.user);
        }
        return $li;
        break;
    }
  };

  const createChoice = dialogue => {
    if (!dialogue) {
      return;
    }

    const $ul = document.querySelector(`.answers`);
    $ul.classList.remove("flex_row_choices_image");

    const $li = document.createElement(`li`);
    $li.classList = `answer_item`;
    switch (dialogue.type) {
      case `message`:
        $li.innerHTML = `
        <button type="button" class="dialoog_btn" data-id="${dialogue.id}">
          ${dialogue.text}
        </button>
        `;
        return $li;
        break;
      case `image`:
        $ul.classList.add("main-carousel");

        $li.innerHTML = `
        <button type="button" class="dialoog_btn" data-id="${dialogue.id}">
          <img src="${dialogue.src}" class="img_responsive choice_img">
        </button>
        `;

        $li.classList.add(`is-imgchoice`);
        $li.classList.add("carousel-cell");
        return $li;
        break;

      case `video`:
        $li.innerHTML = `
        <button type="button" class="dialoog_btn" data-id="${dialogue.id}">
          <video class="img_responsive" autoplay loop>
            <source src="${dialogue.src}" type="video/mp4">
          </video>
        </button>
        `;

        $li.classList = `is-videochoice`;
        return $li;
        break;
    }
  };

  const setHeightChat = () => {
    const $answers = document.querySelector(".answers_list");
    const $dialoog = document.querySelector(".dialoog_list");

    if ($answers && $dialoog) {
      $dialoog.style.marginBottom = `${$answers.offsetHeight}px`;
    }

    scrollToBottomMessages();
  };

  window.onload = function() {
    setHeightChat();
  };

  const scrollToBottomMessages = () => {
    const $msgs = document.querySelector(`.dialoog_scroll`);
    $msgs.scroll({
      top: $msgs.scrollHeight - $msgs.clientHeight,
      behavior: "smooth"
    });
  };

  const init = () => {
    // new Game1();
    // new Game2();

    const naam = "emmaplasschaert";
    const url = `./assets/data/stories.json`;
    const url2 = `./assets/data/${naam}.json`;

    fetch(url2)
      .then(r => r.json())
      .then(jsonData => {
        parseStory(jsonData);
      });

    fetch(url)
      .then(r => r.json())
      .then(jsonData => {
        parse(jsonData);
      });

    createIntro();

    const elem = document.querySelector(".main-carousel");
    if (elem) {
      new Flickity(elem, {
        // options
        cellAlign: "left",
        draggable: true,
        prevNextButtons: false,
        pageDots: false
      });
    }
  };

  init();
}
