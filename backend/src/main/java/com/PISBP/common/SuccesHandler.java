package com.PISBP.common;

import com.PISBP.MyUserDetails;
import com.PISBP.entity.Rubrika;
import com.PISBP.entity.User;
import com.PISBP.service.MyUserDetailsService;
import com.PISBP.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SuccesHandler implements AuthenticationSuccessHandler {

    private final UserService userService;

    public SuccesHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String username = authentication.getName();
        String userId = String.valueOf(((MyUserDetails) authentication.getPrincipal()).getId());
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        User user = userService.getUser(username);
        List<String> rubrike=user.getRubrike().stream().map(Rubrika::getNaziv).toList();
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("username", username);
        responseData.put("userId", userId);
        responseData.put("role", role);
        responseData.put("rubrike",rubrike);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(new ObjectMapper().writeValueAsString(responseData));
    }
}
