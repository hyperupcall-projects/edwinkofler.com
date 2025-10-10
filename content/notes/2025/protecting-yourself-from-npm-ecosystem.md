+++
title = 'How to Protect Yourself from the npm Ecosystem'
author = 'Edwin Kofler'
date = 2025-10-09 23:59:59Z
categories = []
tags = ['nodejs']
+++

> [!info] Info: CSU Montertey Bay Students
> If you attend [California State University, Monterey Bay](https://csumb.edu), feel free to reach out to me if you need help! I'm on the school's Slack.

Recently, there has been a wave of WILD supply chain attacks on npm. Wild not because they were particularly technically sophisticated, but because of their recent frequency and impact.

- August 26, 2025: [Nx packages](https://nx.dev/blog/s1ngularity-postmortem) ([socket.dev link](https://socket.dev/blog/nx-packages-compromised)) compromised (4.6 million weekly downloads)
- September 8 2025: [Packages co-maintained by Qix-](https://socket.dev/blog/npm-author-qix-compromised-in-major-supply-chain-attack) compromised (2-3 _billion_ weekly downloads)
- September 9, 2025: [duckdb packages](https://socket.dev/blog/duckdb-npm-account-compromised-in-continuing-supply-chain-attack) were compromised
- September 15, 2025: [tinycolor packages](https://socket.dev/blog/tinycolor-supply-chain-attack-affects-40-packages) were compromised (2.2 million weekly downloads)

The effects of these attacks have mostly been limited to stealing credentials and "money" from cryptocurrency wallets. But, of course worse things are possible.

## Supply Chain Attack

This form of "supply chain attack" targets software dependencies. For example, suppose that your software project depends on a library called "liba", and let's say that "liba" also depends on another library called "libf". If you update "liba" then it is possible that "libf" is updated as well (the maintainers of "liba" may update "libf" without your knowledge). Now, suppose that a malicious actor publishes a new version of "libf" that contains malicious code. If "liba" updates to that version, and if you download the latest version of "liba", then you will install the malicious "libf" as well. If "libf" is a package that many developers (millions) depend on, then it has the potential to cause catestrophic damage.

For a more in-depth explanation, see [Cloudflare's](https://www.cloudflare.com/learning/security/what-is-a-supply-chain-attack/) or [Wikipedia](https://en.wikipedia.org/wiki/Supply_chain_attack).

When a supply chain attack occurs, it usually follows a pattern:

1. A malicious actor uploads a new version of a popular software library
3. Other application and libraries update to the malicious version (without knowing that it is malicious)
4. A few hours goes by. Somebody notices that the new version is malicious. The malicious version is "unpublished" and people try to revert to using the unmalicious version.

Let's say you are using `npm` to install dependencies. Once you run `npm install`, then by default, the newest available versions of all packages will be installed.

What if all packages must be at least several hours old before they are installed? Using the previous example, if a malicious "libf" version is published, by the time we wait several hours, the malicious version would likely be detected and "unpublished".

It's not possible to configure this "wait time" with `npm`, but it is possible through a similar tool called `pnpm`, using the `minimumReleaseAge` configuration key.

## Installing `pnpm`

I'm introducing [`pnpm`](https://pnpm.io) because `npm` [does not have](https://github.com/npm/cli/issues/8570) does not have a "minimum release age" feature.

`pnpm` is very similar to `npm`. It accepts essentially identical command line flags and it also downloads packages from [npmjs.com](https://www.npmjs.com). It is also significantly faster than `npm`.

To install `pnpm`, use `npm`:

```console
$ npm install -g pnpm
$ pnpm
Version 10.16.1 (compiled to binary; bundled Node.js v24.7.0)
Usage: pnpm [command] [flags]
       pnpm [ -h | --help | -v | --version ]

Manage your dependencies:
      add                  Installs a package and any packages that it depends on. By default, any new package is installed as a prod dependency
...
```

## Configuring `pnpm`

Now that `pnpm` is installed, we now must configure it so that packages have a "minimum release age" before they can be used. `pnpm`. See the [`minimumReleaseAge` documentation](https://pnpm.io/settings#minimumreleaseage) for more info:

> To reduce the risk of installing compromised packages, you can delay the installation of newly published versions. In most cases, malicious releases are discovered and removed from the registry within an hour.
>
> `minimumReleaseAge` defines the minimum number of minutes that must pass after a version is published before pnpm will install it. This applies to **all dependencies**, including transitive ones.

To set this, first create a file in `~/.config/pnpm/rc`:

> [!warn] Warning: Windows
> If you are using Windows, you'll _most likely_ want to create this file at `C:\Users\<USERNAME>\AppData\Local\pnpm\config\rc` instead. See the [source](https://github.com/pnpm/pnpm/blob/986516756c3a926b962c4db3fafa94cdb499f0eb/config/config/src/dirs.ts#L67) for details. Also, instead of `touch` and `mkdir -p` (used below), use `New-Item -ItemType File <FILENAME>` and `mkdir <DIRECTORY>`, respectively.

> [!warn] Warning: macOS
> If you are using macOS, you'll _most likely_ want to create this file at `/Users/<USERNAME>/Library/Preferences/pnpm/rc` instead. See the [source](https://github.com/pnpm/pnpm/blob/986516756c3a926b962c4db3fafa94cdb499f0eb/config/config/src/dirs.ts#L67) for details.

```console
mkdir -p ~/.config/pnpm
touch ~/.config/pnpm/rc
```

In `~/.config/pnpm/rc`, add:

```yaml
minimumReleaseAge = 2880
shamefullyHoist = true
```

`minimumReleaseAge` is set to `2880` minutes, or 2 days. So, you'll have a "buffer zone" of 2 days for people to identify detect malicious packages. That is a bit high; you can make it smaller if you'd like.

`shamefullyHoist` isn't related to improving security. By default, `pnpm` writes dependencies to `node_modules/` a little differently than `npm`. This configuration changes `pnpm` to better match `npm`'s behavior. I'm adding this so people less familiar with the Node.js ecosystem potentially run into less issues when using `pnpm`. If you're more experienced, feel free to ignore this.

Now, let's verify the configuration:

```console
$ pnpm config list
access=public
git-tag-version=true
message=v%s
minimumReleaseAge=2880
registry=https://registry.npmjs.org/
shamefullyHoist=true
sign-git-commit=true
sign-git-tag=true
tag-version-prefix=v
...
```

Note that `minimumReleaseAge` and `shamefullyHoist` are set properly.

## Using `pnpm`

First, `cd` to a Node.js project:

```console
$ cd ~/project1
$ ls
index.js  node_modules/  package.json  package-lock.json
```

Now, remove `./node_modules`, and the `npm`-specific `./package-lock.json`:

```bash
rm -rf ./node_modules
rm -f ./package-lock.json
```

Great. Now `pnpm` can be used:

```bash
pnpm install
```

Just like `npm`, it reads `./package.json`, then installs the dependencies to `./node_modules`, and lastly writes a list of all the dependencies that were used to `./pnpm-lock.yaml`.

And now, with our configuration, `pnpm` is using `minimumReleaseAge` to wait downloading new versions of packages for the specified amount of time.

### Switching Back to `npm`

To switch back to `npm`, remove `./node_modules`, and the `pnpm`-specific `./pnpm-lock.yaml`:

```bash
rm -rf node_modules/
rm -f ./pnpm-lock.yaml
```

That's it! Now use `npm`:

```bash
npm install
```

> [!info] Info
> Not all of these steps are always necessary, but I recommend that you run them if you are less familiar with the Node.js ecosystem.

## Final Thoughts

In my opinion, `minimumReleaseAge` is a good initial mitigation, but the problem should be fixed at the registry level. If a package has a certain number of downloads, and a new package version is uploaded, it should only be published after several hours and/or it should be gradually deployed over several days.
