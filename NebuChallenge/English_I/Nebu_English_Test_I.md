\exam-top{「赴尘杯」2025 年高考模拟测试卷 I}{英语}

### **第一部分 阅读**

#### 第一节


阅读下列短文，从每题所给的 A、B、C、D 选项中选出最佳选项

\begin{exam-part}
\center{## A}

\center{### The Jokes of Masters}
There are many people who shaped the current world’s pattern. However, the jokes behind them also bring us joy. 

#### Jeff Dean
Jeff Dean, a top American computer scientist, made huge impacts at Google. He worked on key projects like MapReduce. Elected to the NAE in 2009, he’s now Google’s Chief Scientist.
1. During his own Google interview, Jeff Dean was asked the  implications if P=NP were true. He said, “P = 0 or N = 1.” Then, before  the interviewer had even finished laughing, Jeff examined Google’s  public certificate and wrote the private key on the whiteboard.
2. Compilers don’t warn Jeff Dean. Jeff Dean warns compilers.
3. The rate at which Jeff Dean produces code jumped by a factor of 40  in late 2000 when he upgraded his keyboard to USB 2.0.

#### Linus Torvalds
Linus Torvalds, the creator of Linux, is known for his straightforwardness and humor. His contributions to open-source software have changed the tech landscape forever.
1. When asked why he created Linux, Linus replied, “Because I couldn’t find a good enough excuse to avoid doing my homework.”
2. Linus once said, “I’m not a visionary. I’m just a guy who likes to fix things. And sometimes, I break them first.”
3. The only thing faster than Linus Torvalds’ coding is his ability to respond to a bug report—he can do it before you even finish typing it.

#### Ada Lovelace
Ada Lovelace, often considered the first computer programmer, had a unique perspective on computing in the 19th century.
1. Ada once remarked, “I can see the future of computing, but I still can’t find my keys.”
2. When asked about her thoughts on modern programming languages, she quipped, “If only I had a ‘for loop’ to get through my daily chores!”
3. Ada believed that the only thing more complex than a computer was explaining it to her mother.

#### Donald Knuth
Donald Knuth, the author of “The Art of Computer Programming,” is known for his meticulous approach to algorithms and typesetting.
1. Knuth once said, “I’m not a perfectionist; I just want my algorithms to be as perfect as my typesetting.”
2. When asked how he feels about bugs in his code, he replied, “Bugs are just features waiting to be documented.”
3. Knuth’s favorite exercise? “Counting the number of ways to optimize my coffee breaks.”

#### Grace Hopper
Grace Hopper, a pioneer in computer programming, is famous for her contributions to COBOL and her witty remarks.
1. Grace once said, “A ship in port is safe, but that’s not what ships are built for. Just like code, it’s meant to be deployed!”
2. When asked about debugging, she quipped, “It’s like being a detective in a crime movie where you are also the murderer.”
3. Grace believed that the best way to predict the future of computing was to invent it—preferably with a good cup of coffee in hand.

These jokes not only highlight the brilliance of these masters but also remind us that humor is an essential part of innovation and creativity in the tech world.

---

1. **What was Linus Torvalds' primary motivation for creating Linux?**
A. He wanted a new operating system
B. He hoped to learn more programming skills
C. He couldn't find a good excuse to avoid doing his homework
D. He wanted to challenge Microsoft’s dominance

2. **Which humorous expression reflects Ada Lovelace’s view on modern programming languages?**
A. She thinks they are too complex and hard to understand
B. She wishes she had a “for loop” to handle her daily chores
C. She believes they are unnecessary and a waste of time
D. She thinks they are not flexible enough to meet needs

3. **What attitude does Donald Knuth’s view on bugs in code reflect?**
A. Bugs are a programmer’s failure and must be fixed quickly
B. Bugs are inevitable, and programmers must accept them
C. Bugs can be eliminated through rigorous testing and should never occur
D. Bugs are just features waiting to be documented and should be taken seriously

4. **What point does Grace Hopper’s ship metaphor primarily convey?**
A. The design and construction of the ship are the most important
B. A ship in port is safe, but that is not its purpose
C. Ships need regular maintenance to ensure safety
D. The ship’s ability to sail is more important than docking

5. **What common theme is primarily emphasized in the article?**
A. The humor and innovative spirit of the masters
B. The history and development of computers
C. The competition and collaboration between tech companies
D. The evolution and challenges of programming languages
\end{exam-part}
\begin{exam-part}
\center{## A}

\center{### Unified Extensible Firmware Interface/Secure Boot}

Secure Boot is a security feature found in the UEFI standard, designed to add a layer of protection to the pre-boot process: by maintaining a cryptographically signed list of binaries authorized or forbidden to run at boot, it helps in improving the confidence that the machine core boot components (boot manager, kernel, initramfs) have not been tampered with.

As such it can be seen as a continuation or complement to the efforts in securing one’s computing environment, reducing the attack surface that other software security solutions such as system encryption cannot easily cover, while being totally distinct and not dependent on them. Secure Boot just stands on its own as a component of current security practices, with its own set of pros and cons.

## Before Booting the OS

[This content is missing and needs to be completed in Question 3.]

## Booting an installation medium

In order to boot an installation medium in a Secure Boot system, you will need to either disable Secure Boot or modify the image in order to add a signed boot loader.

### Disabling Secure Boot

The Secure Boot feature can be disabled via the UEFI firmware interface. How to access the firmware configuration is described in [Before booting the OS](#). Some motherboards (this is the case in a Packard Bell laptop and recent Xiaomi laptops) only allow to disable secure boot if you have set an administrator password that can be removed afterwards. See also Rod Smith’s Disabling Secure Boot.

### Editing the installation medium

If you are using a USB flash installation medium, then it is possible to manually edit the EFI system partition on the medium to add support for Secure Boot.

## Implementing Secure Boot

### Using a signed boot loader

Using a signed boot loader means using a boot loader signed with Microsoft’s key. There are two known signed boot loaders: PreLoader and shim. Their purpose is to chainload other EFI binaries (usually boot loaders). Since Microsoft would never sign a boot loader that automatically launches any unsigned binary, PreLoader and shim use an allowlist called Machine Owner Key list, abbreviated MokList. If the SHA256 hash of the binary (Preloader and shim) or key the binary is signed with (shim) is in the MokList they execute it, if not they launch a key management utility which allows enrolling the hash or key.

#### PreLoader

When run, PreLoader tries to launch `loader.efi`. If the hash of `loader.efi` is not in MokList, PreLoader will launch `HashTool.efi`. In HashTool you must enroll the hash of the EFI binaries you want to launch, that means your boot loader (`loader.efi`) and kernel. Each time you update any of the binaries (e.g. boot loader or kernel) you will need to enroll their new hash.

##### Set up PreLoader

**Note:** `PreLoader.efi` and `HashTool.efi` in efitools package are not signed, so their usefulness is limited. You can get a signed `PreLoader.efi` and `HashTool.efi` from preloader-signed (AUR) or download them manually.

Install preloader-signed (AUR) and copy `PreLoader.efi` and `HashTool.efi` to the boot loader directory, then copy over the boot loader binary and rename it to `loader.efi`. Finally, create a new NVRAM entry to boot `PreLoader.efi`. After these steps, this entry should be added to the list as the first to boot; check with the `efibootmgr` command and adjust the boot-order if necessary.

###### Fallback

If there are problems booting the custom NVRAM entry, copy `HashTool.efi` and `loader.efi` to the default loader location booted automatically by UEFI systems. Copy over `PreLoader.efi` and rename it.

For particularly intransigent UEFI implementations, copy `PreLoader.efi` to the default loader location used by Windows systems. Then as before, copy `HashTool.efi` and `loader.efi` to `esp/EFI/Microsoft/Boot/`. If dual-booting with Windows, backup the original `bootmgfw.efi` first as replacing it may cause problems with Windows updates. When the system starts with Secure Boot enabled, follow the steps above to enroll `loader.efi` and `/vmlinuz-linux` (or whichever kernel image is being used).

##### How to use while booting?

A message will show up that says `Failed to Start loader... I will now execute HashTool.` To use HashTool for enrolling the hash of `loader.efi` and `vmlinuz.efi`, follow these steps. These steps assume titles for a remastered archiso installation media. The exact titles you will get depend on your boot loader setup.

- Select *OK*
- In the HashTool main menu, select *Enroll Hash*, choose `\loader.efi` and confirm with *Yes*. Again, select *Enroll Hash* and `archiso` to enter the archiso directory, then select `vmlinuz.efi` and confirm with *Yes*. Then choose *Exit* to return to the boot device selection menu.
- In the boot device selection menu choose *Arch Linux archiso x86_64 UEFI CD*

#### shim

When run, shim tries to launch `grubx64.efi`. If MokList does not contain the hash of `grubx64.efi` or the key it is signed with, shim will launch MokManager (`mmx64.efi`). In MokManager you must enroll the hash of the EFI binaries you want to launch (your boot loader (`grubx64.efi`) and kernel) or enroll the key they are signed with.

Using hash is simpler, but each time you update your boot loader or kernel you will need to add their hashes in MokManager. With MOK you only need to add the key once, but you will have to sign the boot loader and kernel each time it updates.

## Protecting Secure Boot

The only way to prevent anyone with physical access from disabling Secure Boot is to protect the firmware settings with a password. Most UEFI firmwares provide such a feature, usually listed under the “Security” section in the firmware settings.

---

1. **Which of the following statements about Secure Boot is INCORRECT?**
A. Secure Boot represents a critical security mechanism embedded within the UEFI standard.
B. Secure Boot functions by enforcing a policy that restricts the execution of boot-time binaries to those that are cryptographically signed and thereby verified as authentic.
C. Secure Boot ensures the integrity of core boot components and the efficacy of system encryption relies on the presence or state of Secure Boot.
D. Secure Boot operates independently of other security measures and provides an additional layer of defense against pre-boot attacks.

2. **Which of the following statements about the possible usage and configuration of Secure Boot is CORRECT?**
A. Recent iterations of Xiaomi laptops give users access to the configuration of Secure Boot within the firmware only if the administrator password remains active after setting up. Users can possibly set the password in the “Security” section in the firmware settings.
B. Developers of Linux distributions have the capability to assist users to employ PreLoader which includes HashTool, a mechanism which facilitates the integration of the keys utilized for digitally signing EFI binary files into the Machine Owner Key List (MokList) of the user’s laptop.
C. When configuring Secure Boot using PreLoader and encountering issues with booting a custom NVRAM entry, it is always necessary to copy `HashTool.efi` and `loader.efi` to the UEFI system’s default automatic boot loader location. Subsequently, `PreLoader.efi` must be copied to the default boot loader location used by Windows systems.
D. During the boot process, suppose HashTool is used to enroll the hashes of `loader.efi` and `vmlinuz.efi`. Start by selecting *OK* to begin. Enroll the hash for `loader.efi` by choosing *Enroll Hash* and confirming with *Yes*, and then repeat the process for `vmlinuz.efi`. Finally, exit HashTool to return to the boot device selection menu, and select the appropriate Arch Linux boot option (such as *Arch Linux archiso x86_64 UEFI CD*), depending on your boot loader configuration, to start the system.

3. **Which content is possibly included in [Before booting the OS](#)?**

A.
> At this point, one has to look at the firmware setup. If the machine was booted and is running, in most cases it will have to be rebooted.
>
> You may access the firmware configuration by pressing a special key during the boot process. The key to use depends on the firmware. It is usually one of Esc, F2, Del or possibly another Fn key. Sometimes the right key is displayed for a short while at the beginning of the boot process. The motherboard manual usually records it. You might want to press the key, and keep pressing it, immediately following powering on the machine, even before the screen actually displays anything.
>
> After entering the firmware setup, be careful not to change any settings without prior intention. Usually there are navigation instructions, and short help for the settings, at the bottom of each setup screen. The setup itself might be composed of several pages. You will have to navigate to the correct place. The interesting setting might be simply denoted by secure boot, which can be set on or off.

B.
> There are certain conditions making for an ideal setup of Secure boot:
>
> 1. UEFI considered mostly trusted (despite having some well known criticisms and vulnerabilities[1]) and necessarily protected by a strong password
>
> 2. Default manufacturer/third party keys are not in use, as they have been shown to weaken the security model of Secure Boot by a great margin
>
> 3. UEFI directly loads a user-signed EFI boot stub-compatible unified kernel image (no boot manager), including microcode (if applicable) and initramfs so as to maintain throughout the boot process the chain of trust established by Secure Boot and reduce the attack surface
>
> 4. Use of full drive encryption, so that the tools and files involved in the kernel image creation and signing process cannot be accessed and tampered with by someone having physical access to the machine.
>
> 5. Some further improvements may be obtained by using a TPM.
>
> A simple and fully self-reliant setup is described in [Using your own keys](#), while [Using a signed boot loader](#) makes use of intermediate tools signed by a third-party.

C.
> Replacing the platform keys with your own can end up bricking hardware on some machines, including laptops, making it impossible to get into the firmware settings to rectify the situation. This is due to the fact that some device (e.g GPU) firmware (OpROMs), that get executed during boot, are signed using Microsoft 3rd Party UEFI CA certificate or vendor certificates. This is the case in many Lenovo Thinkpad X, P and T series laptops which uses the Lenovo CA certificate to sign UEFI applications and firmware.
>
> **Do not** copy the `noPK.auth` file to the EFI system partition (ESP) of your PC! If you do this, and someone e.g. steals your PC, this person can delete the personal Platform Key in the UEFI Secure Boot firmware again, turn on “Setup Mode” on your PC again and replace your Secure Boot Keys (PK, KEK, db, dbx) with their own Platform Key, thereby defeating the whole purpose of UEFI Secure Boot. Only you should be able to replace the Platform Key, so only you should have access to the `noPK.auth` file. Therefore keep the `noPK.auth` file in a secret, safe place where only you have access to.

D.
> Point the current boot device to the one which has the Arch Linux installation medium. Typically it is achieved by pressing a key during the POST phase, as indicated on the splash screen. Refer to your motherboard’s manual for details.
>
> When the installation medium’s boot loader menu appears,
>
> 1. if you used the ISO, select Arch Linux install medium and press Enter to enter the installation environment.
>
> 2. if you used the Netboot image, choose a geographically close mirror from Mirror menu, then select Boot Arch Linux and press Enter.
>
> You will be logged in on the first virtual console as the root user, and presented with a Zsh shell prompt.
>
> To switch to a different console—for example, to view this guide with Lynx alongside the installation—use the Alt+arrow shortcut. To edit configuration files, mcedit(1), nano and vim are available. See `pkglist.x86_64.txt` for a list of the packages included in the installation medium.

\end{exam-part}

### **第四部分 写作**

#### 第一节

\begin{exam-part}

假定你是李华，你的朋友 Hu Zihan 最近在给希沃安装 Arch Linux, 请你写一封信帮助他，内容包括：

(1) 表示支持；
(2) 进入 BIOS 进行安装前操作；
(3) 进入 Arch Linux install medium 进行基础安装；
(4) 进入 Arch Linux 主系统进行日常配置：更换镜像源，更新软件包，安装 KDE 桌面环境，安装输入法，设置 Timeshift 快照，配置 Git 密匙；
(5) 安装显卡驱动。

#### 注意：

(1) 希沃快捷键: BIOS F2; Manager F8;
(2) 写作词数不做要求，但必须可以复现；
(3) 请按如下格式在相应位置作答。

\exam-essay{Dear Hu Zihan:}

\end{exam-part}

\begin{exam-part}

#### 第二节

阅读下面的材料，根据其内容和所给段落开头续写两段，使之构成一篇完整的短文。

Years later, as he confronted(面对) the Zig programming language, Hu Zihan would reminisce(回忆) about that distant afternoon spent coding in C++. “How much clearer it is compared to C++!” he mused(思忖), reflecting on Zig’s syntax(语法), which he found to be more concise(简洁的). As he delved(深入研究) deeper into Zig’s capabilities, Hu Zihan became increasingly captivated(着迷) by its design philosophy. The absence of garbage collection(垃圾回收) in Zig granted him an unparalleled level of control over memory management(内存管理), a critical advantage for his resource - constrained projects.
 
In a serendipitous turn of events, Hu Zihan developed a fascination(痴迷) for Rubik’s cubes. During an English class, he and his classmates became engrossed (全神贯注的) in solving the puzzles, diverting (转移) their attention from the lesson. Their English teacher, possessing (拥有) keen (敏锐的) hearing and sharp eyesight, quickly noticed their distraction and promptly (迅速地) confiscated (没收) Hu Zihan’s Rubik’s Cube. Disheartened (沮丧的) by the loss, Hu Zihan turned to the internet in search of a suitable substitute (替代品) to satisfy his newfound obsession (痴迷).

While browsing the internet, he stumbled upon(偶然发现) a website featuring an online Rubik’s cube simulation. However, as he engaged with the application, he noticed performance hiccups(卡顿) and the limitations in its WebGL - based implementation(实现). The cube’s rotations occasionally stuttered(卡顿), and the overall visual fidelity fell short of his high standards.
 
An innovative(创新的) idea ignited(萌生) in his mind. Armed with his proficiency in Zig and a burgeoning interest in WebAssembly (Wasm) and WebGPU, he envisioned a transformative approach to enhance the online Rubik’s cube experience.
 
Hu Zihan embarked on(着手进行) an extensive research phase, meticulously analyzing the existing codebase(代码库) of the website’s Rubik’s cube implementation. Gaining a comprehensive understanding of the cube’s logic—particularly the rotation algorithms(旋转算法) and state management—was paramount(至关重要的). He documented potential optimization points and identified areas where WebGPU could significantly elevate performance.
 
With a clear plan in mind, he began the process of porting(移植) the relevant code segments to Zig. His familiarity with Zig’s syntax enabled him to craft clean, efficient code. He meticulously rewrote the cube - manipulation algorithms, leveraging Zig’s robust type - checking(类型检查) and compile - time optimizations to enhance performance and reliability(可靠性).
 
Once the core logic was successfully translated into Zig, Hu Zihan shifted his focus to integrating(整合) it with Wasm. He compiled(编译) his Zig code into a WebAssembly module, ensuring it could be seamlessly loaded and executed within the browser environment. This phase required careful attention to detail to facilitate smooth communication between the JavaScript - based front end(前端) and the Wasm module.
 
With the Wasm module operational, Hu Zihan turned his attention to WebGPU. He initiated the setup of the WebGPU context within the browser, which involved initializing the device, creating buffers(缓冲区) for the cube’s vertex and index data, and establishing the rendering pipeline(渲染管线). He crafted shaders(着色器) using a GLSL - like syntax compatible(兼容的) with WebGPU to manage the cube’s visual attributes, including color and lighting effects.
 
As he progressed, Hu Zihan encountered a series of challenges. Compatibility issues arose between different browsers’ implementations of WebGPU, necessitating additional debugging(调试). Yet, his unwavering determination propelled him forward, driving him to refine his implementation and ultimately enhance the online Rubik’s cube experience. Through perseverance(毅力) and innovation, Hu Zihan was poised to redefine the intersection of programming and interactive gaming.
 
#### 注意：

(1) 续写词数应为 250 个左右；
(2) 请按如下格式在答题卡相应位置作答。

\exam-essay{Finally, after weeks of hard work, Hu Zihan had a working prototype.}

\exam-essay{He showcased his creation to the teacher and requested the Rubik's Cube's return.}

\exam-essay{Motivated by the teacher, he reached out to the website owner to share his work.}

\end{exam-part}