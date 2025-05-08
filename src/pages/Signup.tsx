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

export default function Signup() {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const loginStore = useAppStore((s) => s.login);

  const handleSubmit = () => {
    if (signup(username, password)) {
      loginStore();
      navigate("/resources");
    } else {
      setError("Username already exists.");
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
              <Title
                align="center"
                order={2}
                style={{
                  fontWeight: 700,
                  color: theme.colors.dark[7],
                  fontSize: "1.9rem",
                }}
              >
                🚀 Create Your Space Explorer ID
              </Title>

              <TextInput
                label="Username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                  setError("");
                }}
                required
                size="md"
              />
              <TextInput
                label="Password"
                placeholder="Choose a password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setError("");
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
                  Initiate Launch
                </Button>
              </Group>

              <Text align="center" size="sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: theme.colors.blue[6],
                    textDecoration: "underline",
                  }}
                >
                  Log in
                </Link>
              </Text>
            </Stack>
          </Paper>
        </Container>
      </Center>
    </BackgroundImage>
  );
}
