# Viacheslav Alpatov

## [Task Presentation](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/presentation-recorded.md)

## [Video](https://youtu.be/-G754Cdpn6E)
## [Reveal presentation's deploy](https://rolling-scopes-school.github.io/donalpatino-JSFE2023Q1/presentation/)


## Text transcript

My name is Viacheslav Alpatov and today I want to talk about Docker. It’s not very young technology, but not well understood by junior developers. Especially in context how to use it in modern software developing.
When we speak about Docker for the first, we have to talk about containers. Of course, containers are not young technology too. Really, we can say it’s old technology, because their prototypes were implemented in early versions of FreeBSD as “jails” and now forgot operation system Solaris as Solaris containers in end of twenty century. But of course, this technology became popular when it was released in Linux as pack of special features – namespaces and cgroups. These features made possible to isolate a specific application with it’s environment from operating system. “Pack” it in container.

So why the containers useful?

1.	They are portable. The isolated environment that containers effectively provide means the containers are decoupled from the environment in which they run. You haven’t thought about what versions of what software installed on the operating system. Your application doesn’t affect other applications. Other applications don’t affect your apps.
2.	Consistency – since the containers are decoupled from the environment in which they run, you can be sure that they operate the same, regardless of where they are deployed.
3.	Speed to deploy. If app run in a container in local environment - then it can be made to run in a container in any other environment – another computer, Internet servers, clouds. So, you can easily deploy your apps at «once» command “docker up’. And do it very quickly.

When we speak about containers and containerization, we can’t pass through VM.

They provide similar functionality – creating isolate environment for applications. But do it another way - when we speak about VM we have to understand that such system – full copy of full server with all hardware, operating system, additional software and all that stuff. So, we have long boot, big disks, great overhead.
Containers, against, instead of full hardware virtualization use resource of host operating system. No hypervisor, no hardware virtualization, only resource limit and network and file system isolation. So they are much more lightweight than VM. And it means small disks, fast boot.

And now we come to Docker. Containerization is very cool. But for the first time there was not any simple and useful tools for manipulating containers in Linux. You had to be experienced sysadmins for correct deploying and tuning such system. And then come Docker. A containerization platform, but more important, simple toolkit that allows any Linux user, not only sysadmins, to build, deploy and manage containerized applications.

Docker is an open-source platform, free to download. Docker comes with a command line interface (CLI), using which you can do all the operations that the platform provides. Of course, there is also Docker Inc, the company that sells the commercial version of Docker.

Dive a little in Docker terminology

* Images: The blueprints of our application which form the basis of containers. Contain application, its dependencies and all the configuration settings that define the isolated environment.
* Containers: Running instances of a Docker image where run the actual application. You can have many containers for one image. And many-many containers in one operating systems.
* Docker Daemon: Background service running on the host that listens to API calls, manages images and building, running and distributing containers. 
* Docker Client: The command line tool that allows the user to interact with the daemon. 
* Docker Hub: A registry of Docker images containing all available Docker images. Can be your own. There is a global container storage Hub.docker.com. Something like github, but for images.

So, let’s build a simple container. 

Let’s write a simple JavaScript server. Use express of course. Nothing special.

Write special file, it’s called dockerfile, that contain step by step instruction how to build our container. Basic image, module install and application start.

And we have 3 commands for build, run and publish app in docker repository. 

And that’s all. 

Now we can get this container at any server on the Internet and use it. Don’t think about dependencies, building and installing.

Of course, it’s a very-very simple example. But you can build image with many package, huge node-modules, very complex business logic, pack it in one container and distribute it without any problem. 

More – you can use docker-compose, special tool for manipulating of set of containers, and get pack of pre-configure containers with database, cache and other services by one command working on your computer! This is very useful when you develop as part of a project with complex infrastructure and need all that software to run at your local computer.
And when you become experienced with Docker – you can get next step and starting work and develop for Kubernetes, special platform for complex systems management, that contains many microservices and use containers under its hood. But that's a whole other story.

For the last – some useful links for self-study

Thank you. And may be any questions?


