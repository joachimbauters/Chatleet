import "./style.css";
import "phaser";
// import Game1 from "./classes/game1/Game.js";
// import Game2 from "./classes/game2/Game.js";

{
  let stories;
  let story;
  let dialogueCount = 0;

  const parse = data => {
    stories = data.stories;
    stories.forEach(story => {
      createStory(story);
    });
  };

  const createStory = story => {
    const $ul = document.querySelector(`.stories`);
    const $li = document.createElement(`li`);
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
    const $chatbox = document.querySelector(`.messages`);
    if ($naam) {
      $naam.innerHTML = story.ontvanger;
    }

    story.premise.forEach(premise => {
      const $message = createMessage(premise);
      $chatbox.appendChild($message);
    });

    createAnswersAndResponses(story.dialogues);

    setHeightChat();
    scrollToBottomMessages();
  };

  const createAnswersAndResponses = dialogues => {
    const $answerbox = document.querySelector(`.answers`);
    $answerbox.innerHTML = ``;
    const currentDialogue = dialogues[dialogueCount];
    console.log(dialogueCount);
    console.log(currentDialogue);

    if (!currentDialogue) {
      return;
    }

    currentDialogue.choices.forEach((choice, i) => {
      const $choice = createChoice(choice);
      $answerbox.appendChild($choice);
    });

    const $btns = document.querySelectorAll(".dialoog_btn");
    $btns.forEach(btn => {
      btn.addEventListener("click", handleClickAnswer);
    });
  };

  const handleClickAnswer = e => {
    console.log(e.currentTarget);
    dialogueCount++;
    createAnswersAndResponses(story.dialogues);
  };

  const createMessage = premise => {
    const $li = document.createElement(`li`);
    switch (premise.type) {
      case `message`:
        $li.innerHTML = `
        <div class="dialoog ${premise.user}">
          <div class="dialoog_avatar avatar_${premise.user}">
            <img src="./assets/${premise.character}.jpg" class="img_responsive">
          </div>
          <div class="dialoog_message">
            <p>${premise.text}</p>
          </div>
        </div>
        `;
        return $li;
        break;
      case `image`:
        $li.innerHTML = `
        <div class="dialoog ${premise.user}">
          <div class="dialoog_avatar avatar_${premise.user}">
            <img src="./assets/${premise.character}.jpg" class="img_responsive">
          </div>
          <div class="dialoog_message is-image">
            <img src="${premise.src}" class="img_responsive">
          </div>
        </div>
        `;
        return $li;
        break;
    }
  };

  const createChoice = dialogue => {
    if (!dialogue) {
      return;
    }

    const $li = document.createElement(`li`);
    $li.classList = `answer_item`;
    switch (dialogue.type) {
      case `message`:
        $li.innerHTML = `
        <button type="button" class="dialoog_btn" data-id="${dialogue.id}">
          <p class="answer">${dialogue.text}</p>
        </button>
        `;
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
    $msgs.scrollTop = $msgs.scrollHeight;
  };

  const init = () => {
    //new Game1();
    //new Game2();

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
