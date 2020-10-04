<template>
  <div
    ref="conversationContent"
    class="conversation-content"
    @scroll="
      scrollHitTop($event, getConversationMessages);
      scrollingDown($event);
    "
  >
    <div class="spinner" v-if="GET_MES_LOADER">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div
      class="conversation-container"
      v-if="GET_ONE_CONVERSATION && GET_ONE_CONVERSATION.messages.length > 0"
    >
      <!-- <div class="message-day">
        <div class="message">
          <div class="message-wrapper">
            <div class="message-content bg-light">
              <span>
                I have to give a presentation on global warming on Friday, and I
                am so nervous.
              </span>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-dFate ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="message self">
          <div class="message-wrapper">
            <div class="message-content bg-theme text-white">
              <span>
                I have to give a presentation on global warming on Friday, and I
                am so nervous.
              </span>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="message-day">
        <div class="message">
          <div class="message-wrapper">
            <div class="message-content bg-light">
              <span>
                I have to give a presentation on global warming on Friday, and I
                am so nervous.
              </span>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="message">
          <div class="message-wrapper">
            <div class="message-content bg-light">
              <span>
                I have to give a presentation on global warming on Friday, and I
                am so nervous.
              </span>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="message self">
          <div class="message-wrapper">
            <div class="message-content bg-theme text-white">
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
                molestiae excepturi eum repudiandae inventore voluptatum
                deleniti nulla! Deleniti explicabo ducimus quaerat, enim ut
                accusantium aut obcaecati laborum provident molestiae voluptatem
                atque voluptatum vitae, assumenda quis a facere nemo rem tempore
                officia. Tempora et quidem libero voluptatem esse animi culpa
                magni repudiandae doloribus, minima provident odit est sed!
                Quasi dolorum amet natus minima, aliquid nihil consectetur
                laborum incidunt corrupti repellendus animi laudantium
                asperiores atque beatae ducimus
              </span>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="message-day">
        <div class="message">
          <div class="message-wrapper">
            <div class="message-content bg-light">
              <div class="document">
                <div class="document__left">
                  <svg class="document__icon">
                    <use
                      xlink:href="@/assets/img/icons/sprites.svg#icon-file-text"
                    />
                  </svg>
                </div>
                <div class="document__right">
                  <h6 class="document__name">
                    <a href="#" title="global-warming-data-2020.xlxs"
                      >global-warming-data-2020.xlxs</a
                    >
                  </h6>
                  <div class="document-info mt-sm">
                    <span class="document-info__text">79.2 KB</span>
                    <span class="document-info__text ml-1">XLXS</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="message">
          <div class="message-wrapper">
            <div class="message-content bg-light">
              <span>
                I have to give a presentation on global warming on Friday, and I
                am so nervous.
              </span>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="message self">
          <div class="message-wrapper">
            <div class="message-content bg-theme text-white">
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
                molestiae excepturi eum repudiandae inventore voluptatum
                deleniti nulla! Deleniti explicabo ducimus quaerat, enim ut
                accusantium aut obcaecati laborum provident molestiae voluptatem
                atque voluptatum vitae, assumenda quis a facere nemo rem tempore
                officia. Tempora et quidem libero voluptatem esse animi culpa
                magni repudiandae doloribus, minima provident odit est sed!
                Quasi dolorum amet natus minima, aliquid nihil consectetur
                laborum incidunt corrupti repellendus animi laudantium
                asperiores atque beatae ducimus
              </span>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="message-day">
        <div class="message">
          <div class="message-wrapper">
            <div class="message-content bg-light">
              <span>
                I have to give a presentation on global warming on Friday, and I
                am so nervous.
              </span>
              <div class="message-media">
                <div class="message-media__wrapper">
                  <a class="message-media__popup" href="#">
                    <img src="@/assets/img/files/f1.png" alt="file" />
                  </a>
                  <a class="message-media__popup" href="#">
                    <img src="@/assets/img/files/f2.png" alt="file" />
                  </a>
                  <a class="message-media__popup" href="#">
                    <img src="@/assets/img/files/f3.png" alt="file" />
                  </a>
                  <a class="message-media__popup" href="#">
                    <img src="@/assets/img/files/f1.png" alt="file" />
                  </a>
                  <a class="message-media__popup" href="#">
                    <img src="@/assets/img/files/f2.png" alt="file" />
                  </a>
                  <a class="message-media__popup" href="#">
                    <img src="@/assets/img/files/f3.png" alt="file" />
                  </a>
                </div>
              </div>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="message self">
          <div class="message-wrapper">
            <div class="message-content bg-theme text-white">
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
                molestiae excepturi eum repudiandae inventore voluptatum
                deleniti nulla!
              </span>
            </div>
            <div class="message-options">
              <div class="message-avatar">
                <img src="@/assets/img/users/girl.png" alt="girl" />
              </div>
              <div class="message-date ml-1">9:12am</div>
              <div class="message-date d-flex align-items-center">
                <svg
                  class="media-nav__icon cursor-pointer dropdown-button no-style"
                >
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                  />
                </svg>
                <div class="dropdown-menu">
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                      />
                    </svg>
                    <span class="ml-1">Copy</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                      />
                    </svg>
                    <span class="ml-1">Reply</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                      />
                    </svg>
                    <span class="ml-1">Forward</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                      />
                    </svg>
                    <span class="ml-1">Favourite</span>
                  </a>
                  <a class="dropdown-item message-action__item" href="#">
                    <svg class="message-action__icon icon-danger">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                      />
                    </svg>
                    <span class="ml-1 text-danger">Delete</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div v-for="(item, i) in groupMessages" :key="i">
        <div class="message-when">
          <p>{{ isToday(item.date) ? 'Today' : item.date }}</p>
        </div>
        <div
          class="message-day"
          v-for="message in item.messages"
          :key="message._id"
        >
          <div class="message" v-if="message.sender._id !== GET_LOCAL_USER._id">
            <div class="message-wrapper">
              <div class="message-content bg-light" v-if="message.message">
                <span class="message-text">
                  {{ message.message }}
                </span>
              </div>
              <div
                class="message-media"
                v-if="message.files && message.files.length > 0"
              >
                <div class="message-media__wrapper">
                  <a
                    class="message-media__popup"
                    href="#"
                    v-for="file in message.files"
                    :key="file"
                    :class="{
                      'flex-1 h-auto': message.files.length === 1
                    }"
                  >
                    <img
                      :src="file"
                      :class="{ 'h-auto': message.files.length === 1 }"
                      :alt="file"
                      @click="pictureSwipe(message.files)"
                    />
                  </a>
                </div>
              </div>
              <div class="message-options">
                <div class="message-avatar">
                  <img
                    :src="
                      require(`@/assets/img/users/${message.sender.avatar}`)
                    "
                    alt="girl"
                  />
                </div>
                <div class="message-dFate ml-1">
                  {{ formatAMPM(new Date(message.createdAt)) }}
                </div>
                <div class="message-date d-flex align-items-center">
                  <svg
                    class="media-nav__icon cursor-pointer dropdown-button no-style"
                  >
                    <use
                      xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                    />
                  </svg>
                  <div class="dropdown-menu">
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                        />
                      </svg>
                      <span class="ml-1">Copy</span>
                    </a>
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                        />
                      </svg>
                      <span class="ml-1">Reply</span>
                    </a>
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                        />
                      </svg>
                      <span class="ml-1">Forward</span>
                    </a>
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                        />
                      </svg>
                      <span class="ml-1">Favourite</span>
                    </a>
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon icon-danger">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                        />
                      </svg>
                      <span class="ml-1 text-danger">Delete</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="message self" v-else>
            <div class="message-wrapper">
              <div
                class="message-content bg-theme text-white"
                v-if="message.message"
              >
                <span class="message-text">
                  {{ message.message }}
                </span>
              </div>
              <div
                class="message-media"
                v-if="message.files && message.files.length > 0"
              >
                <div class="message-media__wrapper">
                  <a
                    class="message-media__popup"
                    href="#"
                    v-for="file in message.files"
                    :key="file"
                    :class="{
                      'flex-1 h-auto': message.files.length === 1
                    }"
                  >
                    <img
                      :src="file"
                      :class="{ 'h-auto': message.files.length === 1 }"
                      :alt="file"
                      @click="pictureSwipe(message.files)"
                    />
                  </a>
                </div>
              </div>
              <div class="message-options">
                <div class="message-avatar">
                  <img
                    :src="
                      require(`@/assets/img/users/${message.sender.avatar}`)
                    "
                    alt="girl"
                  />
                </div>
                <div class="message-date ml-1">
                  {{ formatAMPM(new Date(message.createdAt)) }}
                </div>
                <div class="message-date d-flex align-items-center">
                  <svg
                    class="media-nav__icon cursor-pointer dropdown-button no-style"
                  >
                    <use
                      xlink:href="@/assets/img/icons/sprites.svg#icon-keyboard-control"
                    />
                  </svg>
                  <div class="dropdown-menu">
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-content-copy"
                        />
                      </svg>
                      <span class="ml-1">Copy</span>
                    </a>
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-left"
                        />
                      </svg>
                      <span class="ml-1">Reply</span>
                    </a>
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-corner-up-right"
                        />
                      </svg>
                      <span class="ml-1">Forward</span>
                    </a>
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-star-o"
                        />
                      </svg>
                      <span class="ml-1">Favourite</span>
                    </a>
                    <a class="dropdown-item message-action__item" href="#">
                      <svg class="message-action__icon icon-danger">
                        <use
                          xlink:href="@/assets/img/icons/sprites.svg#icon-trash-o"
                        />
                      </svg>
                      <span class="ml-1 text-danger">Delete</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="message-day pb-2"
        v-if="isShowTyping(GET_ONE_CONVERSATION._id)"
      >
        <div class="typing-indicator">
          <span />
          <span />
          <span />
        </div>
        <img
          style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;"
          :src="require(`@/assets/img/users/${contact.avatar}`)"
          :alt="contact.fullName"
        />
      </div>
    </div>
    <div
      class="conversation-container h-100 d-flex align-items-center justify-content-center"
      v-else
    >
      <h1>Say hi</h1>
    </div>
    <picture-swipe
      v-if="pictureSwipeData.length > 0"
      :pictures="pictureSwipeData"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PictureSwipe from '@/components/common/PictureSwipe';
import mixin from '@/mixins/global';

export default {
  name: 'ConversationContent',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  components: {
    PictureSwipe
  },
  computed: {
    ...mapGetters([
      'GET_ONE_CONVERSATION',
      'GET_LOCAL_USER',
      'GET_SHOW_TYPING',
      'GET_MES_LOADER'
    ]),
    groupMessages() {
      const groups = this.GET_ONE_CONVERSATION.messages.reduce(
        (groups, message) => {
          const date = message.createdAt.split('T')[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(message);
          return groups;
        },
        {}
      );

      /* const groupArrays = Object.keys(groups).map(date => {
        return {
          date,
          messages: groups[date]
        };
      });

      groupArrays.forEach(ga => {
        const gaGroup = ga.messages.reduce((groups, message) => {
          const date = message.createdAt;
          if (!groups[this.formatAMPM(new Date(date))]) {
            groups[this.formatAMPM(new Date(date))] = [];
          }
          groups[this.formatAMPM(new Date(date))].push(message);
          return groups;
        }, {});

        ga.messages = Object.keys(gaGroup).map(time => {
          return {
            time,
            messages: gaGroup[time]
          };
        });
      }); */

      return Object.keys(groups).map(date => {
        return {
          date,
          messages: groups[date]
        };
      });
    }
  },
  data() {
    return {
      pictureSwipeData: []
    };
  },
  mixins: [mixin],
  methods: {
    ...mapActions(['getConversationMessages']),
    pictureSwipe(pictures) {
      this.pictureSwipeData = pictures;
    }
  },
  mounted() {
    // this.scrollTo(
    //   document.querySelector('.conversation-content'),
    //   document.querySelector('.conversation-content').scrollHeight,
    //   10
    // );
  }
};
</script>
