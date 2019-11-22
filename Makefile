PREACT_CLI := $(PWD)/node_modules/.bin/preact

.PHONY: deps
## Install dependencies
deps: node_modules

node_modules: package.json yarn.lock
	@yarn install
	@touch $@

.DEFAULT_GOAL := serve
.PHONY: serve
## Serve site at http://localhost:3000 with hot reloading
serve: deps
	@$(PREACT_CLI) watch -p 3000

.PHONY: build
## Build site for production use
build: deps
	@$(PREACT_CLI) build --dest site

define primary
\033[38;2;166;204;112;1m$(1)\033[0m
endef

define title
\033[38;2;255;204;102m$(1)\033[0m\n
endef

.PHONY: help
## List available commands
help:
	@printf "$(call primary,wshudan)\n"
	@printf "Web Shudan\n\n"
	@printf "$(call title,USAGE)"
	@printf "    make <SUBCOMMAND>\n\n"
	@printf "$(call title,SUBCOMMANDS)"
	@awk '{ \
		line = $$0; \
		while((n = index(line, "http")) > 0) { \
			if (match(line, "https?://[^ ]+")) { \
			  url = substr(line, RSTART, RLENGTH); \
			  sub(url, "\033[38;2;119;168;217m"url"\033[0m", $$0);  \
			  line = substr(line, n + RLENGTH); \
			} else {\
				break; \
			} \
		}\
		\
		if ($$0 ~ /^.PHONY: [a-zA-Z\-\_0-9]+$$/) { \
			helpCommand = substr($$0, index($$0, ":") + 2); \
			if (helpMessage) { \
				printf "    $(call primary,%-8s)%s\n", \
					helpCommand, helpMessage; \
				helpMessage = ""; \
			} \
		} else if ($$0 ~ /^##/) { \
			if (helpMessage) { \
				helpMessage = helpMessage "\n            " substr($$0, 3); \
			} else { \
				helpMessage = substr($$0, 3); \
			} \
		} \
	}' \
	$(MAKEFILE_LIST)
