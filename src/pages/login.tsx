import { useState } from "react";
import {
  Button,
  TextInput,
  Title,
  Paper,
  Center,
  Stack,
  Group,
  BackgroundImage,
  Container,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useNavigate, Link } from "react-router-dom";
import { useAppStore } from "../store/app.store";
import { useAuth } from "../auth/useAuth";

export default function Login() {
  const { login: doLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loginStore = useAppStore((s) => s.login);
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleSubmit = () => {
    // Form validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    if (doLogin(username, password)) {
      loginStore();
      navigate("/resources");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <BackgroundImage
      src="https://mrwallpaper.com/images/hd/4k-space-falcon-9-rocket-jt1kwzng7b8tap3l.jpg"
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Center style={{ minHeight: "100vh" }}>
        <Container size="xs" px="xs" py="xl">
          <Paper
            shadow="xl"
            radius="md"
            p="xl"
            withBorder
            style={{
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "50px",
            }}
          >
            <Stack spacing="lg">
              <Title align="center" order={2}>
                🚀 Login to Explore Space
              </Title>

              <TextInput
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                  setError(""); // Reset error when typing
                }}
                required
                size="md"
              />
              <TextInput
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setError(""); // Reset error when typing
                }}
                required
                size="md"
              />

              {error && (
                <Text color="red" size="sm">
                  {error}
                </Text>
              )}

              <Group position="right" mt="md">
                <Button fullWidth size="md" onClick={handleSubmit}>
                  Launch
                </Button>
              </Group>

              <Text align="center" size="sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: theme.colors.blue[6],
                    textDecoration: "underline",
                  }}
                >
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Paper>
        </Container>
      </Center>
    </BackgroundImage>
  );
}
