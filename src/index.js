import "./style.css";
import "phaser";
// import Game1 from "./classes/game1/Game.js";
// import Game2 from "./classes/game2/Game.js";

{
  let stories;
  let story;
  let dialogueCount = 0;
  let currentDialogue;
  const $answerbox = document.querySelector(`.answers`);
  const $chatbox = document.querySelector(`.messages`);

  const parse = data => {
    stories = data.stories;
    stories.forEach(story => {
      createStory(story);
    });
  };

  const createStory = story => {
    const $ul = document.querySelector(`.stories`);
    const $li = document.createElement(`li`);
    console.log(stories);

    $li.classList.add(`story`);
    $li.innerHTML = `
      <a href="index.php?page=${story.name.link}">
        <div class="story_card">
          <span class="contact-status online"></span>
          <img src="${story.picture.thumbnail}" alt="${story.name.voornaam} ${story.name.achternaam}" class="img_responsive story_img"/>
          <div class="meta">
            <h3 class="story_naam">${story.name.voornaam} ${story.name.achternaam}</h3>
            <p class="story_bijtext">text</p>
          </div>
        </div>
      </a>
    `;
    if ($ul) {
      $ul.appendChild($li);
    }
  };

  const parseStory = data => {
    story = data.scenarios.scenario_1;
    const $naam = document.querySelector(`.chat_head_name`);
    if ($naam) {
      $naam.innerHTML = story.ontvanger;
    }

    story.premise.forEach(premise => {
      const $message = createMessage(premise);
      $chatbox.appendChild($message);
    });

    createAnswersAndResponses(story.dialogues);
    setHeightChat();
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

    const $btns = document.querySelectorAll(".dialoog_btn");
    $btns.forEach(btn => {
      btn.addEventListener("click", handleClickAnswer);
    });
  };

  const handleClickAnswer = e => {
    dialogueCount = e.currentTarget.dataset.id;
    createAnswersAndResponses(story.dialogues);

    const answer = e.currentTarget.innerHTML;
    console.log(answer);

    if (answer === "Continue") {
      return;
    } else {
      const $li = document.createElement(`li`);
      $li.innerHTML = `
          <div class="dialoog other">
            <div class="dialoog_message_other">
              <p>${answer}</p>
            </div>
          </div>
          `;
      $chatbox.appendChild($li);
    }

    if (!currentDialogue) {
      return;
    }

    currentDialogue.replies.forEach(reply => {
      const $reply = createMessage(reply);
      $chatbox.appendChild($reply);
    });

    scrollToBottomMessages();
    setHeightChat();
  };

  const createMessage = message => {
    const $li = document.createElement(`li`);
    switch (message.type) {
      case `message`:
        message.user === "character"
          ? ($li.innerHTML = `
        <div class="dialoog ${message.user}">
          <div class="dialoog_avatar avatar_${message.user}">
            <img src="./assets/${message.character}.jpg" class="img_responsive">
          </div>
          <div class="dialoog_message_${message.user}">
            <p>${message.text}</p>
          </div>
        </div>
        `)
          : ($li.innerHTML = `
        <div class="dialoog ${message.user}">
          <div class="dialoog_message_${message.user}">
            <p>${message.text}</p>
          </div>
        </div>
        `);
        return $li;
        break;
      case `image`:
        message.user === "character"
          ? ($li.innerHTML = `
        <div class="dialoog ${message.user}">
          <div class="dialoog_avatar avatar_${message.user}">
            <img src="./assets/${message.character}.jpg" class="img_responsive">
          </div>
          <div class="dialoog_message is-image">
            <img src="${message.src}" class="img_responsive">
          </div>
        </div>
        `)
          : ($li.innerHTML = `
        <div class="dialoog ${message.user}">
          <div class="dialoog_message is-image">
            <img src="${message.src}" class="img_responsive">
          </div>
        </div>
        `);
        return $li;
        break;
      case `link`:
        message.user === "character"
          ? ($li.innerHTML = `
        <div class="dialoog ${message.user}">
          <div class="dialoog_avatar avatar_${message.user}">
            <img src="./assets/${message.character}.jpg" class="img_responsive">
          </div>
          <div class="dialoog_message_${message.user} is-link">
            <a href="${message.link}" target="_blank">${message.link}</a>
          </div>
        </div>
        `)
          : ($li.innerHTML = `
        <div class="dialoog ${message.user}">

          <div class="dialoog_message_${message.user} is-link">
            <a href="${message.link}" target="_blank">${message.link}</a>
          </div>
        </div>
        `);
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
        $ul.classList.add("flex_row_choices_image");

        $li.innerHTML = `
        <button type="button" class="dialoog_btn" data-id="${dialogue.id}">
          <img src="${dialogue.src}" class="img_responsive choice_img">
        </button>
        `;

        $li.classList = `is-imgchoice`;
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
  };

  const scrollToBottomMessages = () => {
    const $msgs = document.querySelector(`.dialoog_scroll`);
    const $list = document.querySelector(`.dialoog_list`);
    console.log($msgs.scrollHeight);

    console.log($answerbox.offsetHeight);

    $msgs.scrollTop = $list.scrollHeight;
  };

  const init = () => {
    // new Game1();
    // new Game2();

    const naam = "emmaplasschaert";
    const url = `./assets/data/stories.json`;
    const url2 = `./assets/data/${naam}.json`;
    fetch(url)
      .then(r => r.json())
      .then(jsonData => {
        parse(jsonData);
      });

    fetch(url2)
      .then(r => r.json())
      .then(jsonData => {
        parseStory(jsonData);
      });
  };

  init();
}
