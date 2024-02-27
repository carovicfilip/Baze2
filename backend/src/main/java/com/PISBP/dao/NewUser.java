package com.PISBP.dao;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewUser {
    public String username;
    public String password;
    public String role;
    public List<String> rubrike;
}
