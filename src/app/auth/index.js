import React, { useEffect, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import LoginHead from "../../components/login-head";
import Tools from "../../containers/tools";

function Login() {
	const store = useStore();

	useInit(async () => {
		await store.get('catalog').initParams();
	}, [], {backForward: true});

	const {t} = useTranslate();

	const profile = useSelector((state) => state.profile);
	const logout = useCallback(() => store.get('profile').logout(profile), []);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if(token && !profile.isLogin) store.get('profile').auth(token);
	}, []);

	useEffect(() => {if(profile.isLogin) navigate("/profile")}, [profile.isLogin])

	return (
		<Layout auth={<LoginHead profile={profile} logout={logout}/>} head={
			<LayoutFlex flex="between">
				<h1>{t('title')}</h1>
				<LocaleSelect/>
			</LayoutFlex>
		}>
			<Tools/>
			<LoginForm/>
		</Layout>
	)
}

export default React.memo(Login);