const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenfromSessionStorage: () => {
				const token = sessionStorage.getItem("token");
				console.log("Aplication just loaded, synching the session storage token")
				if (token && token != "" && token != undefined) setStore({token: token})

			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login out")
				setStore({token: null})
			},

			login: async (email, password) => {
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/token", options)
					console.log(response.status)
					if (response.status !== 200) {
						alert("There has been an error");
						return false;
					};
					const data = await response.json()
					console.log("This came from the back end ", data)
					setStore({ token: data.access_token })
					sessionStorage.setItem("token", data.access_token)
					return true;
				} catch (error) {
					console.log("There has been an error login in", error)
				};
			},

			getMessage: async () => {
				const store = getStore();
				const options = {
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				};

				try {
					// fetching data from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/hello", options)
					const data = await response.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;