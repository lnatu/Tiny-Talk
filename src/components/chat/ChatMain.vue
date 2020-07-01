<template>
  <section class="chats h-100">
    <div class="conversation h-100">
      <div class="conversation-header">
        <div class="media">
          <div class="media__avatar mr-2">
            <img src="@/assets/img/users/girl.png" alt="girl" />
          </div>
          <div class="media__body">
            <h6 class="media__name">Demi Lovato</h6>
            <p class="media__status text-muted mt-sm">Online</p>
          </div>
        </div>
        <ul class="media-nav list-style-none">
          <li class="media-nav__item">
            <a class="media-nav__link" href="#">
              <svg class="media-nav__icon">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-search" />
              </svg>
            </a>
          </li>
          <li class="media-nav__item">
            <a class="media-nav__link" href="#">
              <svg class="media-nav__icon">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-phone-call"
                />
              </svg>
            </a>
          </li>
          <li class="media-nav__item">
            <a class="media-nav__link" href="#">
              <svg class="media-nav__icon">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-more-vert"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="conversation-content">
        <div class="conversation-container">
          <div class="message-day">
            <div class="message">
              <div class="message-wrapper">
                <div class="message-content bg-light">
                  <span>
                    I have to give a presentation on global warming on Friday,
                    and I am so nervous.
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
                    I have to give a presentation on global warming on Friday,
                    and I am so nervous.
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
                    I have to give a presentation on global warming on Friday,
                    and I am so nervous.
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
                    I have to give a presentation on global warming on Friday,
                    and I am so nervous.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Neque molestiae excepturi eum repudiandae inventore
                    voluptatum deleniti nulla! Deleniti explicabo ducimus
                    quaerat, enim ut accusantium aut obcaecati laborum provident
                    molestiae voluptatem atque voluptatum vitae, assumenda quis
                    a facere nemo rem tempore officia. Tempora et quidem libero
                    voluptatem esse animi culpa magni repudiandae doloribus,
                    minima provident odit est sed! Quasi dolorum amet natus
                    minima, aliquid nihil consectetur laborum incidunt corrupti
                    repellendus animi laudantium asperiores atque beatae ducimus
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
                    I have to give a presentation on global warming on Friday,
                    and I am so nervous.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Neque molestiae excepturi eum repudiandae inventore
                    voluptatum deleniti nulla! Deleniti explicabo ducimus
                    quaerat, enim ut accusantium aut obcaecati laborum provident
                    molestiae voluptatem atque voluptatum vitae, assumenda quis
                    a facere nemo rem tempore officia. Tempora et quidem libero
                    voluptatem esse animi culpa magni repudiandae doloribus,
                    minima provident odit est sed! Quasi dolorum amet natus
                    minima, aliquid nihil consectetur laborum incidunt corrupti
                    repellendus animi laudantium asperiores atque beatae ducimus
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
                    I have to give a presentation on global warming on Friday,
                    and I am so nervous.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Neque molestiae excepturi eum repudiandae inventore
                    voluptatum deleniti nulla!
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
        </div>
      </div>
      <div class="conversation-footer">
        <form action="#">
          <div class="typing-area">
            <div class="typing-box media">
              <div class="media-options">
                <a class="media-options__cta" href="#">
                  <svg class="media-options__icon">
                    <use xlink:href="@/assets/img/icons/sprites.svg#icon-add" />
                  </svg>
                </a>
                <div class="media-popup">
                  <a class="media-popup__item" href="#">
                    <svg class="media-popup__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-files"
                      />
                    </svg>
                    <span class="ml-1">Files</span>
                  </a>
                  <a class="media-popup__item" href="#">
                    <svg class="media-popup__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-mic"
                      />
                    </svg>
                    <span class="ml-1">Audio</span>
                  </a>
                  <a class="media-popup__item" href="#">
                    <svg class="media-popup__icon">
                      <use
                        xlink:href="@/assets/img/icons/sprites.svg#icon-piechart"
                      />
                    </svg>
                    <span class="ml-1">Poll</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="typing-box prepare-message">
              <textarea
                id="self-message"
                class="no-resize"
                name="self-message"
                rows="5"
                placeholder="Your message..."
              />
            </div>
            <div class="typing-box cta">
              <a
                class="cta-send d-flex align-items-center justify-content-center"
                href="#"
              >
                <svg class="cta-send__icon">
                  <use xlink:href="@/assets/img/icons/sprites.svg#icon-send" />
                </svg>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="contact h-100 hide-scrollbar">
      <div class="contact-header">
        <h5>Profile Details</h5>
        <svg class="icon-svg--2x cursor-pointer">
          <use xlink:href="@/assets/img/icons/sprites.svg#icon-clearclose" />
        </svg>
      </div>
      <div class="contact-body">
        <div class="profile">
          <div class="profile-avatar">
            <img src="@/assets/img/users/girl.png" alt="girl" />
          </div>
          <div class="profile-text">
            <h4 class="text-medium">Demi Lovato</h4>
            <p
              class="text-light d-flex align-items-center justify-content-center mt-1 text-small"
            >
              <svg class="icon-svg--1x cursor-pointer mr-sm">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-map-pin" />
              </svg>
              <span>San Fransisco, CA</span>
            </p>
          </div>
          <div class="profile-actions">
            <a class="profile-actions__item border-light bg-white" href="#">
              <svg class="icon-svg--2x cursor-pointer">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-user-plus"
                />
              </svg>
            </a>
            <a class="profile-actions__item bg-theme" href="#">
              <svg class="icon-svg--2x icon-svg--white cursor-pointer">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-heart-o" />
              </svg>
            </a>
            <a class="profile-actions__item bg-danger" href="#">
              <svg class="icon-svg--2x icon-svg--white cursor-pointer">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-slash" />
              </svg>
            </a>
          </div>
        </div>
        <div class="user-info">
          <div class="user-info__header">
            <h5>User Information</h5>
            <svg class="icon-svg--1x cursor-pointer">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-info" />
            </svg>
          </div>
          <div class="user-info__content">
            <h6 class="info-label">Phone</h6>
            <p class="info-text">+01-222-364522</p>
          </div>
          <div class="user-info__content">
            <h6 class="info-label">Email</h6>
            <p class="info-text">catherine.richardson@gmail.com</p>
          </div>
          <div class="user-info__content">
            <h6 class="info-label">Address</h6>
            <p class="info-text">
              1134 Ridder Park Road, San Fransisco, CA 94851
            </p>
          </div>
        </div>
        <div class="user-info">
          <div class="user-info__header">
            <h5>Shared Media</h5>
            <svg class="icon-svg--1x cursor-pointer">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-picture" />
            </svg>
          </div>
          <div class="shared-media">
            <a class="shared-media__item" href="#">
              <img src="@/assets/img/files/f1.png" alt="file 1" />
            </a>
            <a class="shared-media__item" href="#">
              <img src="@/assets/img/files/f2.png" alt="file 2" />
            </a>
            <a class="shared-media__item" href="#">
              <img src="@/assets/img/files/f3.png" alt="file 3" />
            </a>
          </div>
        </div>
        <div class="user-info p-0 pt-2">
          <div class="user-info__header px-2">
            <h5>Shared Files</h5>
            <svg class="icon-svg--1x cursor-pointer">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-file" />
            </svg>
          </div>
          <div class="shared-media">
            <div
              class="document d-flex align-items-center line-height-1 border-bottom p-2 px-2 w-100"
            >
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
            <div
              class="document d-flex align-items-center line-height-1 border-bottom p-2 px-2 w-100"
            >
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
            <div
              class="document d-flex align-items-center line-height-1 border-bottom p-2 px-2 w-100"
            >
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ChatMain'
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_conversation';
@import '@/assets/scss/components/_message';
@import '@/assets/scss/components/_typing';
@import '@/assets/scss/components/_contact';
</style>
